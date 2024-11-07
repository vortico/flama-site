import React from 'react'

import MDXContent from '@/components/mdx/MDXContent'

import { type BlogDocument } from '../../mdx'

export default function Body({ document }: { document: BlogDocument }) {
  return <MDXContent document={document} components={{ nav: () => <></> }} />
}
