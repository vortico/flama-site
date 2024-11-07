import React from 'react'

import { getBlogDocument, listBlogDocuments } from '../mdx'
import { Body, Header, Menu } from './_components'

interface Params {
  params: { slug: string }
}

async function getDocument({ params }: Params) {
  return await getBlogDocument(params.slug)
}

export async function generateStaticParams() {
  return Object.keys(await listBlogDocuments()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params) {
  const document = await getDocument({ params })

  return {
    title: document.frontmatter.title,
    description: document.frontmatter.description,
    alternates: {
      canonical: `/blog/${params.slug}/`,
    },
  }
}

export default async function Blog({ params }: Params) {
  const document = await getDocument({ params })

  return (
    <>
      <header className="mb-9 px-4 pt-16 sm:mb-16 sm:px-6 sm:text-center md:px-8">
        <Header document={document} />
      </header>
      <main className="mx-auto mb-20 w-screen max-w-[90rem] space-y-16 overflow-hidden sm:mb-32 md:mb-40">
        <article className="flex w-full flex-col items-start justify-start xl:flex-row">
          <div className="w-full flex-none px-4 sm:px-6 md:px-8 xl:max-w-72">
            <Menu document={document} />
          </div>
          <div className="prose w-full px-4 dark:prose-dark sm:px-6 md:px-8 xl:max-w-[calc(100%-18rem)]">
            <Body document={document} />
          </div>
        </article>
      </main>
    </>
  )
}
