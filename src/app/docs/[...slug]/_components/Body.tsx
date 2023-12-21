'use client'

import MDXContent from '@/components/mdx/MDXContent'
import { withTOC } from '@/components/mdx/toc'

import { type DocsDocument } from '../../mdx'

interface MDXContentProps {
  document: DocsDocument
}

export default function Body({ document }: MDXContentProps) {
  return (
    <MDXContent
      document={document}
      components={{
        nav: withTOC({
          title: document.frontmatter.title,
          titleSlug: document.metadata.titleSlug,
          activeClassNames: '!text-brand-500',
        }),
      }}
    />
  )
}
