import React, { ReactNode } from 'react'

import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeTOC from 'rehype-toc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import remarkSectionize from 'remark-sectionize'

import { Label, Link } from '@/components/elements'
import { Code, H1, H2, H3, H4, H5, H6, Image, Pre } from '@/components/mdx/components'
import { BosqueName, BrumaName, CiclonName, FlamaName, PythonName, VorticoName } from '@/components/names'
import { type Document } from '@/lib/mdx'

const tocOptions = {
  position: 'beforeend',
  cssClasses: {
    toc: 'prose-toc',
    list: 'prose-toc-list',
    listItem: 'prose-toc-list-item',
    link: 'prose-toc-link',
  },
}

const katexOptions = {
  output: 'mathml',
}

const DEFAULT_COMPONENTS = {
  Label,
  BosqueName,
  BrumaName,
  CiclonName,
  FlamaName,
  PythonName,
  VorticoName,
  img: Image,
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  code: Code,
}

interface MDXContentProps<D extends Document> {
  document: D
  components?: { [key: string]: (...rest: any[]) => ReactNode }
}

export default function MDXContent<D extends Document>({ document, components }: MDXContentProps<D>) {
  return (
    <MDXRemote
      source={document.source}
      components={{ ...DEFAULT_COMPONENTS, ...components }}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath, remarkSectionize],
          rehypePlugins: [
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rehypeSlug,
            rehypeCodeTitles,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [rehypeKatex, katexOptions],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [rehypeTOC, tocOptions],
          ],
        },
      }}
    />
  )
}
