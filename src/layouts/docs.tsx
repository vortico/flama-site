import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Docs as IDocs } from '@/contentlayer/types'
import SidebarLayout from '@/layouts/sidebar'
import { createPortal } from 'react-dom'
import { DocsContext } from '@/components/docs/Context'
import { Breadcrumbs } from '@/components/docs/Breadcrumbs'
import { useRouter } from 'next/router'
import { Sidebar } from '@/components/docs/Sidebar'
import { FloatMenu } from '@/components/docs/FloatMenu'

interface DocLayoutProps {
  docs: IDocs
  children: ReactNode
}

export function DocsLayout({ docs, children }: DocLayoutProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  useEffect(() => {
    router.events.on('routeChangeStart', onClose)

    return () => {
      router.events.off('routeChangeStart', onClose)
    }
  }, [router.events, onClose])

  return (
    <DocsContext.Provider value={{ docs, isOpen, onOpen, onClose }}>
      <SidebarLayout sidebar={<Sidebar />} menuChildren={<Breadcrumbs />}>
        <article className="prose dark:prose-dark">
          <section>
            <div className="my-2 flex items-center justify-between">
              <span className="font-semibold text-brand-500">{docs.group}</span>
              <span className="italic">
                ~ {Math.round(docs.readingTime.minutes)} min read
              </span>
            </div>
            <h1
              id={docs.titleSlug}
              className="scroll-mt-28 text-4xl font-bold text-primary-600 dark:text-primary-300"
            >
              {docs.title}
            </h1>
          </section>
          {children}
        </article>
      </SidebarLayout>
      {isOpen && createPortal(<FloatMenu />, document.body)}
    </DocsContext.Provider>
  )
}
