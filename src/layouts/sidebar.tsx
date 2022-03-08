import React, { ReactNode } from 'react'
import BaseLayout from '@/layouts/base'
import { QuickSearchButton } from '@/components/QuickSearchButton'

interface SidebarLayoutProps {
  menu: ReactNode
  children: ReactNode
}

export default function SidebarLayout({ menu, children }: SidebarLayoutProps) {
  return (
    <BaseLayout>
      <div className="fixed bottom-0 top-16 left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-[19.5rem] overflow-y-auto px-8 pb-10 md:top-20 lg:block">
        <div className="fixed">
          <div className="bg-zinc-100 pb-px pt-8 dark:bg-zinc-800">
            <QuickSearchButton className="dark:highlight-white/5 hidden h-8 w-full items-center space-x-3 rounded-full bg-white px-4 text-left shadow-sm ring-1 ring-brand-900/10 hover:ring-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-zinc-700 dark:ring-0 dark:hover:bg-zinc-600 sm:flex" />
          </div>
          <div className="h-10 bg-gradient-to-b from-zinc-100 to-transparent dark:from-zinc-800" />
        </div>
        <nav className="pt-28 pb-10">{menu}</nav>
      </div>
      <main className="mt-8 max-w-5xl lg:pl-[20rem]">{children}</main>
    </BaseLayout>
  )
}
