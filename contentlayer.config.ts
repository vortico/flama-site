import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'
import { MDXOptions } from '@contentlayer/core'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
// @ts-ignore
import remarkSectionize from 'remark-sectionize'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeTOC from 'rehype-toc'

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
  rehypePlugins: [rehypeSlug, rehypeCodeTitles, [rehypeTOC, tocOptions]],
}

const Author = defineNestedType(() => ({
  name: 'Author',
  fields: {
    name: { type: 'string', required: true },
    url: { type: 'string', required: false },
  },
}))

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
      resolve: (item) =>
        parseInt(item._raw.sourceFileName.match(/^(\d+)-.*/)?.[1] || ''),
    },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('docs/', ''),
    },
    group: {
      type: 'string',
      resolve: (item) =>
        item._raw.flattenedPath
          .replace('docs/', '')
          .split('/')[0]
          .replace(/(\d+-)/g, ''),
    },
    slug: {
      type: 'string',
      resolve: (item) =>
        item._raw.flattenedPath
          .toLowerCase()
          .replace('docs/', '')
          .replace(/ /g, '-')
          .replace(/(\d+-)/g, ''),
    },
    titleSlug: {
      type: 'string',
      resolve: (item) => item.title.toLowerCase().replace(/ /g, '-'),
    },
  },
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    authors: { type: 'list', of: Author, required: true },
    tags: { type: 'list', of: { type: 'string' } },
    wip: { type: 'boolean', required: false, default: false },
  },
  computedFields: {
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
    },
    date: {
      type: 'date',
      resolve: (item) =>
        new Date(
          item._raw.sourceFileName.match(/(\d{4}-\d{2}-\d{2}).*/)?.[1] || ''
        ),
    },
    slug: {
      type: 'string',
      resolve: (item) =>
        item._raw.flattenedPath
          .toLowerCase()
          .replace('blog/', '')
          .replace(/\d{4}-\d{2}-\d{2}_/, '')
          .replace(/ /g, '-'),
    },
    titleSlug: {
      type: 'string',
      resolve: (item) => item.title.toLowerCase().replace(/ /g, '-'),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Docs, Blog],
  mdx: mdxOptions,
})
