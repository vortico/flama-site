import { SearchButton } from '@/components/Search'
import { IconSearch } from '@tabler/icons-react'
import React from 'react'

export function QuickSearchButton({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <SearchButton
      {...props}
      className={`dark:highlight-white/5 flex flex-1 items-center gap-x-3 rounded-full bg-white px-4 text-left shadow-sm ring-1 ring-brand-900/10 hover:ring-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-primary-700 dark:ring-0 dark:hover:bg-primary-600 ${className}`}
    >
      {({ actionKey }) => (
        <>
          <IconSearch className="h-6 w-6 flex-none text-brand-500" />
          <span className="flex-auto text-primary-500 dark:text-primary-300">Quick search...</span>
          {actionKey && (
            <kbd className="font-sans font-semibold text-brand-500">
              <abbr title={actionKey[1]} className="text-primary-500 no-underline dark:text-primary-300">
                {actionKey[0]}
              </abbr>{' '}
              K
            </kbd>
          )}
        </>
      )}
    </SearchButton>
  )
}
