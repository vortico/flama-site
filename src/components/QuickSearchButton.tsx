import React from 'react'
import { SearchButton } from '@/components/Search'
import { SearchIcon } from '@heroicons/react/outline'

export function QuickSearchButton({
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <SearchButton {...props}>
      {({ actionKey }) => (
        <>
          <SearchIcon className="h-6 w-6 flex-none text-brand-500" />
          <span className="flex-auto">Quick search...</span>
          {actionKey && (
            <kbd className="font-sans font-semibold text-brand-500">
              <abbr
                title={actionKey[1]}
                className="text-primary-500 no-underline dark:text-primary-400"
              >
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
