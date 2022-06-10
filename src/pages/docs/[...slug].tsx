import { DocsLayout } from '@/layouts/docs'
import { allDocs } from '@/contentlayer'
import type { Docs as IDocs } from '@/contentlayer'
import { useMDXComponent } from 'next-contentlayer/hooks' // eslint-disable-line import/no-unresolved
import { withTOC } from '@/components/mdx/toc'
import { H1, H2, H3, H4, H5, H6 } from '@/components/mdx/header'
import { Code, Pre } from '@/components/mdx/code'
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
  const docsIndex = allDocs.findIndex(
    (docs) => docs.slug === params.slug.join('/')
  )

  return {
    props: {
      docs: allDocs[docsIndex],
      next: allDocs[docsIndex + 1] || null,
      prev: allDocs[docsIndex - 1] || null,
    },
  }
}

interface DocsProps {
  docs: IDocs
  next: IDocs
  prev: IDocs
}

export default function Docs({ docs, next, prev }: DocsProps) {
  const Component = useMDXComponent(docs.body.code)

  return (
    <>
      <NextSeo
        title={docs.title}
        canonical={`https://flama.dev/docs/${docs.slug}`}
      />
      <DocsLayout docs={docs} next={next} prev={prev}>
        <Component
          components={{
            nav: withTOC({
              title: docs.title,
              titleSlug: docs.titleSlug,
              activeClassNames: '!text-brand-500',
            }),
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            h5: H5,
            h6: H6,
            pre: Pre,
            code: Code,
          }}
        />
      </DocsLayout>
    </>
  )
}
