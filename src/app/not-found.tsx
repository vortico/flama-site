import React from 'react'

import { Metadata } from 'next'

import { VerticalLogo } from '@/components/logos'

export const metadata: Metadata = {
  title: 'Not found',
}

export default function Error() {
  return (
    <main className="mx-auto h-screen max-w-3xl">
      <div className="h-full px-8 pt-20 sm:pt-24 lg:pt-48">
        <div className="flex items-center justify-start">
          <VerticalLogo />
          <div className="ml-4 inline-block text-left text-4xl text-brand">Oops...</div>
        </div>
        <div className="mt-10 flex items-center justify-start">
          <h1 className="-mr-px border-r border-primary-400 pr-4">
            <span className="inline-block w-16 text-center font-mono text-3xl font-extrabold">404</span>
          </h1>
          <h2 className="inline-block pl-4 text-primary-300">This page could not be found!</h2>
        </div>
      </div>
    </main>
  )
}
