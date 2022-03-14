import Link from 'next/link'
import React from 'react'
import { QuickSearchButton } from '@/components/QuickSearchButton'

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 text-center sm:pt-24 md:px-8 lg:pt-32">
      <h1 className="text-5xl font-extrabold text-primary-700 dark:text-primary-200 sm:text-6xl lg:text-7xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h1>
      <p className="mx-auto mt-10 max-w-3xl text-lg">
        Quisque ut ultrices diam, id lobortis justo. Maecenas in pharetra dolor.
        Maecenas in pharetra dolor. Nunc vitae arcu in est euismod feugiat.
      </p>
      <div className="mt-10 flex justify-center gap-6 text-sm sm:mt-10">
        <Link href="/docs/">
          <a className="dark:highlight-white/20 flex h-12 w-auto items-center justify-center rounded-full bg-brand-500 px-6 font-semibold text-primary-100 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-brand-50 dark:bg-brand-500 dark:hover:bg-brand-400">
            <span className="text-sm">Get Started</span>
          </a>
        </Link>
        <QuickSearchButton className="dark:highlight-white/5 hidden h-12 w-72 items-center space-x-3 rounded-full bg-white px-4 text-left shadow-sm ring-1 ring-brand-900/10 hover:ring-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-primary-700 dark:ring-0 dark:hover:bg-primary-600 sm:flex" />
      </div>
    </section>
  )
}
