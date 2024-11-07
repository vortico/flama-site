import React from 'react'

import { Metadata } from 'next'

import { BlogPreview } from './_components'
import { getBlogDocuments } from './mdx'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Flama blog',
  alternates: {
    canonical: '/blog/',
  },
}

export default async function Blog() {
  const documents = await getBlogDocuments()

  return (
    <>
      <header className="space-y-4 px-4 pb-9 pt-16 sm:px-6 sm:pb-16 sm:text-center md:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-700 dark:text-primary-200 sm:text-4xl">
          Blog
        </h1>
        <p className="text-lg">All the latest news about Flama directly from the team.</p>
      </header>
      <main className="mx-auto mb-20 max-w-5xl space-y-16 px-4 sm:mb-32 sm:px-6 md:mb-40 md:px-8">
        {documents.map((document, i) => (
          <BlogPreview key={i} document={document} />
        ))}
      </main>
    </>
  )
}
