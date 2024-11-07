import React from 'react'

import { DocsDocument } from '../../mdx'

interface HeaderProps {
  document: DocsDocument
}

export default function Header({ document }: HeaderProps) {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold text-brand-500">{document.metadata.groupName}</span>
        <span className="italic">~ {Math.round(document.metadata.readingTime.minutes)} min read</span>
      </div>
      <h1
        id={document.metadata.titleSlug}
        className="scroll-mt-28 text-4xl font-bold text-primary-600 dark:text-primary-300"
      >
        {document.frontmatter.title}
      </h1>
    </>
  )
}
