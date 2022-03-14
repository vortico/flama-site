import { QuickSearchButton } from '@/components/QuickSearchButton'
import { DocsMenu } from '@/components/docs/Menu'
import React from 'react'

export function Sidebar() {
  return (
    <>
      <div className="fixed">
        <div className="bg-primary-100 pb-px pt-8 dark:bg-primary-800">
          <QuickSearchButton className="dark:highlight-white/5 hidden h-8 w-full items-center space-x-3 rounded-full bg-white px-4 text-left shadow-sm ring-1 ring-brand-900/10 hover:ring-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-primary-700 dark:ring-0 dark:hover:bg-primary-600 sm:flex" />
        </div>
        <div className="h-10 bg-gradient-to-b from-primary-100 to-transparent dark:from-primary-800" />
      </div>
      <div className="pt-28 pb-10">
        <DocsMenu />
      </div>
    </>
  )
}
