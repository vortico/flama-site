'use client'

import React, { useState } from 'react'

import { IconChevronRight, IconDots } from '@tabler/icons-react'
import { createPortal } from 'react-dom'

import { DocsDocument } from '../../mdx'
import { FloatMenu } from './FloatMenu'

interface BreadcrumbsProps {
  documents: DocsDocument[]
  current: DocsDocument
}

export default function Breadcrumbs({ documents, current }: BreadcrumbsProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <>
      <div className="flex items-center space-x-1 pb-8">
        <button className="block h-5 w-5" onClick={() => setMenuOpen(true)} aria-label="Open docs menu">
          <IconDots className="h-full w-full" />
        </button>
        <IconChevronRight className="h-3.5" />
        <span className="text-sm">{current.metadata.groupName}</span>
        <IconChevronRight className="h-3.5" />
        <span className="truncate text-sm font-semibold text-primary-700 dark:text-primary-200">
          {current.frontmatter.title}
        </span>
      </div>
      {menuOpen && createPortal(<FloatMenu documents={documents} onClose={() => setMenuOpen(false)} />, document.body)}
    </>
  )
}
