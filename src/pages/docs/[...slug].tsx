import { DocsLayout } from '@/layouts/docs'
import { allDocs } from '@/contentlayer'
import type { Docs as IDocs } from '@/contentlayer/types'
import { useMDXComponent } from 'next-contentlayer/hooks' // eslint-disable-line import/no-unresolved
import { withTOC } from '@/components/mdx/toc'
import { withHeader } from '@/components/mdx/header'
import { NextSeo } from 'next-seo'

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
  const docs = allDocs.find((docs) => docs.slug === params.slug.join('/'))
  return { props: { docs } }
}

interface DocsProps {
  docs: IDocs
}

export default function Docs({ docs }: DocsProps) {
  const Component = useMDXComponent(docs.body.code)

  return (
    <>
      <NextSeo title={docs.title} canonical={`https://flama.dev/${docs.url}`} />
      <DocsLayout docs={docs}>
        <Component
          components={{
            nav: withTOC({
              title: docs.title,
              titleSlug: docs.titleSlug,
              activeClassNames: '!text-brand-500',
            }),
            h1: withHeader({ level: 1 }),
            h2: withHeader({ level: 2 }),
            h3: withHeader({ level: 3 }),
            h4: withHeader({ level: 4 }),
            h5: withHeader({ level: 5 }),
            h6: withHeader({ level: 6 }),
          }}
        />
      </DocsLayout>
    </>
  )
}
