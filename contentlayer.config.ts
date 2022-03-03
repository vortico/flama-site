import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
// @ts-ignore
import remarkSectionize from 'remark-sectionize'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import rehypeTOC from 'rehype-toc'
import { h } from 'hastscript'
import { MDXOptions } from '@contentlayer/core'

const autoLinkHeadingsOptions = {
  content: () => [
    h(
      '.w-6.h-6.text-zinc-400.ring-1.ring-zinc-900/5.rounded-md.shadow-sm.flex.items-center.justify-center.hover:ring-zinc-900/10.hover:shadow.hover:text-zinc-700.dark:bg-zinc-700.dark:text-zinc-300.dark:shadow-none.dark:ring-0',
      h(
        'svg.h-4.w-4',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor',
          strokeWidth: '2',
        },
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
        })
      )
    ),
  ],
  properties: {
    className:
      'absolute -ml-8 flex items-center opacity-0 border-0 group-hover:opacity-100 transition-opacity duration-500',
    ariaLabel: 'Anchor',
  },
}

const tocOptions = {
  position: 'beforeend',
  cssClasses: {
    toc: 'prose-toc',
    list: 'prose-toc-list',
    listItem: 'prose-toc-list-item',
    link: 'prose-toc-link',
  },
}

const mdxOptions: MDXOptions = {
  remarkPlugins: [remarkGfm, remarkSectionize],
  rehypePlugins: [
    rehypeSlug,
    rehypeCodeTitles,
    [rehypeTOC, tocOptions],
    rehypePrism,
    [rehypeAutolinkHeadings, autoLinkHeadingsOptions],
  ],
}

export const Docs = defineDocumentType(() => ({
  name: 'Docs',
  filePathPattern: 'docs/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    wip: { type: 'boolean', required: false, default: false },
  },
  computedFields: {
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    order: {
      type: 'number',
      resolve: (doc) =>
        parseInt(doc._raw.sourceFileName.match(/^(\d+)-.*/)?.[1] || ''),
    },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('docs/', ''),
    },
    group: {
      type: 'string',
      resolve: (doc) =>
        doc._raw.flattenedPath
          .replace('docs/', '')
          .split('/')[0]
          .replace(/(\d+-)/g, ''),
    },
    slug: {
      type: 'string',
      resolve: (doc) =>
        doc._raw.flattenedPath
          .toLowerCase()
          .replace('docs/', '')
          .replace(/ /g, '-')
          .replace(/(\d+-)/g, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Docs],
  mdx: mdxOptions,
})
