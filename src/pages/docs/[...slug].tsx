import MDXComponent from '@/components/mdx/MDXComponent'
import { withTOC } from '@/components/mdx/toc'
import type { Docs as IDocs } from '@/contentlayer'
import { allDocs } from '@/contentlayer'
import { DocsLayout } from '@/layouts/docs'
import { NextSeo } from 'next-seo'
import React from 'react'

export async function getStaticPaths() {
  return {
    paths: allDocs.map((docs) => ({ params: { slug: docs.slug.split('/') } })),
    fallback: false,
  }
}

interface StaticProps {
  params: {
    slug: string[]
  }
}

export async function getStaticProps({ params }: StaticProps) {
  const docsIndex = allDocs.findIndex((docs) => docs.slug === params.slug.join('/'))

  return {
    props: {
      docs: allDocs[docsIndex],
      next: docsIndex < allDocs.length - 1 ? allDocs[docsIndex + 1] : null,
      prev: docsIndex > 0 ? allDocs[docsIndex - 1] : null,
    },
  }
}

interface DocsProps {
  docs: IDocs
  next: IDocs
  prev: IDocs
}

export default function Docs({ docs, next, prev }: DocsProps) {
  return (
    <>
      <NextSeo title={docs.title} canonical={`https://flama.dev/docs/${docs.slug}/`} />
      <DocsLayout docs={docs} next={next} prev={prev}>
        <MDXComponent
          code={docs.body.code}
          components={{
            nav: withTOC({
              title: docs.title,
              titleSlug: docs.titleSlug,
              activeClassNames: '!text-brand-500',
            }),
          }}
        />
      </DocsLayout>
    </>
  )
}
