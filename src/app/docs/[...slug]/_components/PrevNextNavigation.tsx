import React, { useMemo } from 'react'

import { IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react'

import { Link } from '@/components/elements'

import { type DocsDocument } from '../../mdx'

interface PrevNextNavigationProps {
  documents: DocsDocument[]
  current: DocsDocument
}

export default function PrevNextNavigation({ documents, current }: PrevNextNavigationProps) {
  const sortedDocuments = useMemo<DocsDocument[]>(
    () =>
      documents.sort((x, y) => x.metadata.groupOrder - y.metadata.groupOrder || x.metadata.order - y.metadata.order),
    [documents],
  )
  const currentIndex = documents.findIndex((x) => x.metadata.slug === current.metadata.slug)
  const previous = sortedDocuments[currentIndex - 1]
  const next = sortedDocuments[currentIndex + 1]

  return (
    <div
      className={`mt-10 flex items-center ${previous && next ? 'justify-between' : ''} ${
        previous && !next ? 'justify-start' : ''
      } ${!previous && next ? 'justify-end' : ''}`}
    >
      {previous && (
        <Link className="inline-flex pr-2" href={`/docs/${previous.metadata.slug}/`}>
          <div className="mr-2 h-6 w-6 pt-1">
            <IconChevronsLeft className="h-5 w-5" />
          </div>
          <span>{previous.frontmatter.title}</span>
        </Link>
      )}
      {next && (
        <Link className="inline-flex pl-2" href={`/docs/${next.metadata.slug}/`}>
          <span>{next.frontmatter.title}</span>
          <div className="ml-2 h-6 w-6 pt-1">
            <IconChevronsRight className="h-5 w-5" />
          </div>
        </Link>
      )}
    </div>
  )
}
