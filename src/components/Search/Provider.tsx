import Algolia from '@/algolia.config'
import { SearchContext } from '@/components/Search/Context'
import { Hit, HitProps } from '@/components/Search/Hit'
import { useDocSearchKeyboardEvents } from '@/hooks/useDocSearchKeyboardEvents'
import { DocSearchModal } from '@docsearch/react'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

interface SearchProviderProps {
  children: React.ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialQuery, setInitialQuery] = useState<string>()

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onInput = useCallback(
    (e: KeyboardEvent) => {
      setIsOpen(true)
      setInitialQuery(e.key)
    },
    [setIsOpen, setInitialQuery]
  )

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
  })

  return (
    <>
      <SearchContext.Provider
        value={{
          isOpen,
          onOpen,
          onClose,
          onInput,
        }}
      >
        {children}
      </SearchContext.Provider>
      {isOpen &&
        createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            searchParameters={{
              distinct: 1,
            }}
            placeholder="Search documentation"
            onClose={onClose}
            indexName={Algolia.INDEX_NAME}
            apiKey={Algolia.API_KEY}
            appId={Algolia.APP_ID}
            navigator={{
              navigate({ itemUrl }) {
                setIsOpen(false)
                router.push(itemUrl)
              },
            }}
            hitComponent={({ hit, children }) => Hit({ hit, children } as HitProps)}
            transformItems={(items) => {
              return items.map((item, index) => {
                return {
                  ...item,
                  __is_result: () => true,
                  __is_parent: () => item.type === 'lvl1' && items.length > 1 && index === 0,
                  __is_child: () => item.type !== 'lvl1' && items.length > 1 && items[0].type === 'lvl1' && index !== 0,
                  __is_first: () => index === 1,
                  __is_last: () => index === items.length - 1 && index !== 0,
                }
              })
            }}
          />,
          document.body
        )}
    </>
  )
}
