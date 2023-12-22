import React from 'react'

import { getDocsDocument, getDocsDocuments, listDocsDocuments } from '../mdx'
import { Body, Breadcrumbs, Header, PrevNextNavigation } from './_components'

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
    alternates: {
      canonical: `/docs/${params.slug.join('/')}/`,
    },
  }
}

export default async function Docs({ params }: Params) {
  const document = await getDocument({ params })
  const documents = await getDocsDocuments()

  return (
    <div className="lg:mr-64">
      <Breadcrumbs documents={documents} current={document} />
      <article className="prose dark:prose-dark">
        <section>
          <Header document={document} />
        </section>
        <Body document={document} />
      </article>
      <PrevNextNavigation documents={documents} current={document} />
    </div>
  )
}
