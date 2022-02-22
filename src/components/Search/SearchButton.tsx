import React, { useContext, useEffect, useRef } from 'react'
import { ActionKey, useActionKey } from '@/hooks/useActionKey'
import { SearchContext } from '@/components/Search/Context'

interface ChildrenProps {
  actionKey: ActionKey
}

interface SearchButtonProps extends React.ComponentProps<'button'> {
  children:
    | React.ReactNode
    | (({ actionKey }: ChildrenProps) => React.ReactNode)
}

export function SearchButton({ children, ...props }: SearchButtonProps) {
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const actionKey = useActionKey()
  const { onOpen, onInput } = useContext(SearchContext)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        searchButtonRef &&
        searchButtonRef.current === document.activeElement &&
        onInput
      ) {
        if (/[a-zA-Z0-9]/.test(event.key)) {
          onInput(event)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onInput, searchButtonRef])

  return (
    <button type="button" ref={searchButtonRef} onClick={onOpen} {...props}>
      {typeof children === 'function' ? children({ actionKey }) : children}
    </button>
  )
}
