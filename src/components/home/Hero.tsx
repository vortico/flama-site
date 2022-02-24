import Link from 'next/link'
import { SearchButton } from '@/components/Search'
import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

export function Hero() {
  return (
    <>
      <h1 className="text-5xl font-extrabold text-zinc-700 dark:text-zinc-200 sm:text-6xl lg:text-8xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h1>
      <p className="mx-auto mt-10 max-w-3xl text-lg">
        Quisque ut ultrices diam, id lobortis justo. Maecenas in pharetra dolor.
        Maecenas in pharetra dolor. Nunc vitae arcu in est euismod feugiat.
      </p>
      <div className="mt-10 flex justify-center gap-6 text-sm sm:mt-10">
        <Link href="/docs/">
          <a className="dark:highlight-white/20 flex h-12 w-full items-center justify-center rounded-full bg-brand-500 px-6 font-semibold text-zinc-100 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-brand-50 dark:bg-brand-500 dark:hover:bg-brand-400 sm:w-auto">
            Get Started
          </a>
        </Link>
        <SearchButton className="dark:highlight-white/5 hidden h-12 w-72 items-center space-x-3 rounded-full bg-white px-4 text-left shadow-sm ring-1 ring-brand-900/10 hover:ring-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-zinc-700 dark:ring-0 dark:hover:bg-zinc-600 sm:flex">
          {({ actionKey }) => (
            <>
              <SearchIcon className="h-6 w-6 flex-none text-brand-500" />
              <span className="flex-auto">Quick search...</span>
              {actionKey && (
                <kbd className="font-sans font-semibold text-brand-500">
                  <abbr
                    title={actionKey[1]}
                    className="text-zinc-500 no-underline dark:text-zinc-400"
                  >
                    {actionKey[0]}
                  </abbr>{' '}
                  K
                </kbd>
              )}
            </>
          )}
        </SearchButton>
      </div>
    </>
  )
}
