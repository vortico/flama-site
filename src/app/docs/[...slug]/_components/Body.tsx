import React from 'react'

import { TOC } from '@/components/mdx/components'
import MDXContent from '@/components/mdx/MDXContent'

import { type DocsDocument } from '../../mdx'

export default function Body({ document }: { document: DocsDocument }) {
  return (
    <MDXContent
      document={document}
      components={{
        nav: (props) => (
          <TOC
            title={document.frontmatter.title}
            titleSlug={document.metadata.titleSlug}
            activeClassNames="!text-brand-500"
            {...props}
          />
        ),
      }}
    />
  )
}
