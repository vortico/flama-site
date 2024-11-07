import React, { ReactNode } from 'react'

import { QuickSearchButton } from '@/components/elements'

import { getDocsDocuments } from '../mdx'
import { Menu } from './_components'

async function Sidebar() {
  const documents = await getDocsDocuments()

  return (
    <div className="relative pb-10">
      <div className="sticky inset-0">
        <div className="bg-primary-50 pb-px pt-8 dark:bg-primary-800">
          <div className="flex h-8 w-full">
            <QuickSearchButton />
          </div>
        </div>
        <div className="h-10 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-800" />
      </div>
      <div>
        <Menu documents={documents} />
      </div>
    </div>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[90rem] overflow-hidden">
      <div className="fixed bottom-0 top-20 z-20 hidden w-80 overflow-y-auto px-4 sm:px-6 md:px-8 lg:block">
        <Sidebar />
      </div>
      <main className="mb-20 px-4 pt-8 sm:mb-32 sm:px-6 md:mb-40 md:px-8 lg:ml-80">{children}</main>
    </div>
  )
}
