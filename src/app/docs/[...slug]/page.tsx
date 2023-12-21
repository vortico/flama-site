import React from 'react'

import { getDocsDocument, getDocsDocuments, listDocsDocuments } from '../mdx'
import { Body, Breadcrumbs, Header } from './_components'

interface Params {
  params: { slug: string[] }
}

async function getDocument({ params }: Params) {
  return await getDocsDocument(params.slug.join('/'))
}

export async function generateStaticParams() {
  return Object.keys(await listDocsDocuments()).map((slug) => ({ slug: slug.split('/') }))
}

export async function generateMetadata({ params }: Params) {
  const document = await getDocument({ params })

  return {
    title: document.frontmatter.title,
    description: document.frontmatter.description,
  }
}

export default async function Docs({ params }: Params) {
  const document = await getDocument({ params })
  const documents = await getDocsDocuments()

  return (
    <>
      <Breadcrumbs documents={documents} current={document} />
      <article className="prose pr-4 dark:prose-dark sm:pr-6 md:pr-8 lg:mr-64">
        <section>
          <Header document={document} />
        </section>
        <Body document={document} />
      </article>
    </>
  )
}
