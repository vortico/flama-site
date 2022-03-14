import React from 'react'
import PlainLayout from '@/layouts/plain'

interface ErrorLayoutProps {
  code: string
  description: string
}

export default function ErrorLayout({ code, description }: ErrorLayoutProps) {
  return (
    <PlainLayout>
      <main className="mx-auto h-[calc(100vh-5rem)] max-w-7xl">
        <div className="flex h-full items-center justify-center">
          <h1 className="inline-block border-r border-primary-400 pr-8 text-3xl font-extrabold dark:border-primary-600">
            {code}
          </h1>
          <h2 className="ml-8 inline-block text-left">{description}</h2>
        </div>
      </main>
    </PlainLayout>
  )
}
