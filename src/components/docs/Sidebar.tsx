import { QuickSearchButton } from '@/components/QuickSearchButton'
import { DocsMenu } from '@/components/docs/Menu'
import React from 'react'

export function Sidebar() {
  return (
    <div className="relative px-8 pb-10">
      <div className="sticky inset-0">
        <div className="bg-primary-100 pb-px pt-8 dark:bg-primary-800">
          <div className="flex h-8 w-full">
            <QuickSearchButton />
          </div>
        </div>
        <div className="h-10 bg-gradient-to-b from-primary-100 to-transparent dark:from-primary-800" />
      </div>
      <div>
        <DocsMenu />
      </div>
    </div>
  )
}
