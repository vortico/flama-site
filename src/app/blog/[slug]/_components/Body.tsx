'use client'

import MDXContent from '@/components/mdx/MDXContent'

import { type BlogDocument } from '../../mdx'

interface MDXContentProps {
  document: BlogDocument
}

export default function Body({ document }: MDXContentProps) {
  return <MDXContent document={document} components={{ nav: () => <></> }} />
}
