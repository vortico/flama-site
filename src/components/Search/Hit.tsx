import React from 'react'
import Link from 'next/link'

// eslint-disable-next-line import/named
import { DocSearchHit } from '@docsearch/react/dist/esm/types'

interface IndexedDocSearchHit extends DocSearchHit {
  __is_result(): boolean

  __is_parent(): boolean

  __is_first(): boolean

  __is_last(): boolean

  __is_child(): boolean
}

export interface HitProps {
  hit: IndexedDocSearchHit
  children: React.ReactNode
}

export function Hit({ hit, children }: HitProps) {
  // Get only path from URL to help Next router
  const a = document.createElement('a')
  a.href = hit.url
  const url = `${a.pathname}${a.hash === '#content-wrapper' ? '' : a.hash}`

  if (hit.hierarchy?.lvl0) {
    hit.hierarchy.lvl0 = hit.hierarchy.lvl0.replace(/&amp;/g, '&')
  }

  return (
    <Link
      href={url}
      className={`${hit.__is_result?.() ? 'DocSearch-Hit--Result' : ''} ${
        hit.__is_parent?.() ? 'DocSearch-Hit--Parent' : ''
      } ${hit.__is_first?.() ? 'DocSearch-Hit--FirstChild' : ''} ${
        hit.__is_last?.() ? 'DocSearch-Hit--LastChild' : ''
      } ${hit.__is_child?.() ? 'DocSearch-Hit--Child' : ''}`}
    >
      {children}
    </Link>
  )
}
