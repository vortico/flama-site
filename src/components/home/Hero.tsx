import Link from 'next/link'
import React from 'react'
import { QuickSearchButton } from '@/components/QuickSearchButton'
import LinkButton from '@/components/LinkButton'

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
        <div className="h-12 w-auto">
          <LinkButton text="Get Started" href="/docs" className="px-10" />
        </div>
        <div className="hidden h-12 w-72 sm:flex">
          <QuickSearchButton />
        </div>
      </div>
    </section>
  )
}
