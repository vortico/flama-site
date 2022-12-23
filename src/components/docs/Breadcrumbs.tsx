import { DocsContext } from '@/components/docs/Context'
import { Bars3Icon, ChevronRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

export function Breadcrumbs() {
  const { docs, onOpen } = React.useContext(DocsContext)

  return (
    <div className="flex space-x-3">
      <button className="block h-5 w-5" onClick={onOpen} aria-label="Open docs menu">
        <Bars3Icon />
      </button>
      <div className="flex items-center space-x-1 text-sm">
        <span>{docs?.group}</span>
        <ChevronRightIcon className="h-3.5" />
        <span className="truncate font-semibold text-primary-700 dark:text-primary-200">{docs?.title}</span>
      </div>
    </div>
  )
}
