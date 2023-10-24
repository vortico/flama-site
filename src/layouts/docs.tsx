import { Breadcrumbs } from '@/components/docs/Breadcrumbs'
import { DocsContext } from '@/components/docs/Context'
import { FloatMenu } from '@/components/docs/FloatMenu'
import { Sidebar } from '@/components/docs/Sidebar'
import { PrevNextNavigation } from '@/components/PrevNextNavigation'
import { Docs as IDocs } from '@/contentlayer'
import SidebarLayout from '@/layouts/sidebar'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface DocLayoutProps {
  docs: IDocs
  next: IDocs
  prev: IDocs
  children: ReactNode
}

export function DocsLayout({ docs, next, prev, children }: DocLayoutProps) {
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
        <article className="prose pr-4 dark:prose-dark sm:pr-6 md:pr-8 lg:mr-64">
          <section>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-brand-500">{docs.group}</span>
              <span className="italic">~ {Math.round(docs.readingTime.minutes)} min read</span>
            </div>
            <h1 id={docs.titleSlug} className="scroll-mt-28 text-4xl font-bold text-primary-600 dark:text-primary-300">
              {docs.title}
            </h1>
          </section>
          {children}
          <PrevNextNavigation
            prevTitle={prev?.title}
            prevHref={`/docs/${prev?.slug}/`}
            nextTitle={next?.title}
            nextHref={`/docs/${next?.slug}/`}
          />
        </article>
      </SidebarLayout>
      {isOpen && createPortal(<FloatMenu />, document.body)}
    </DocsContext.Provider>
  )
}
