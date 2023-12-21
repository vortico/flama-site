import React, { useMemo } from 'react'

import { tableOfContent, type TOC, type TOCItem } from '@/lib/toc'

import { type DocsDocument } from '../../mdx'
import MenuCategory from './MenuCategory'

interface MenuProps {
  documents: DocsDocument[]
}

export default function Menu({ documents }: MenuProps) {
  const links = useMemo<TOCItem<DocsDocument>[]>(
    () =>
      documents.map((docs) => ({
        title: docs.frontmatter.title,
        path: docs.metadata.path,
        url: `/docs/${docs.metadata.slug}/`,
        order: docs.metadata.order,
        content: docs,
      })),
    [documents],
  )
  const toc = useMemo<TOC<DocsDocument>>(() => tableOfContent(links), [links])

  return (
    <ul className="space-y-12 lg:space-y-8">
      {toc.categories
        .sort((a, b) => a.order - b.order)
        .map((category, i) => (
          <MenuCategory key={`category.${i}`} category={category} />
        ))}
    </ul>
  )
}
