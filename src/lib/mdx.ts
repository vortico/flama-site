import { promises as fs } from 'fs'
import path from 'path'

import { globby } from 'globby'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeSlug from 'rehype-slug'
import rehypeTOC from 'rehype-toc'
import remarkGfm from 'remark-gfm'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import remarkSectionize from 'remark-sectionize'

const CONTENT_PATH = 'content'

export interface Frontmatter {}

type Content = MDXRemoteSerializeResult

export interface Metadata {
  type: string
  path: string
  slug: string
}

export interface Document<M extends Metadata = Metadata, F extends Frontmatter = Frontmatter> {
  metadata: M
  content: Content
  frontmatter: F
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

function getType(fullPath: string): string {
  const [, type] = fullPath.split('/')
  return type
}

function getFilePath(fullPath: string): string {
  const [, , ...rest] = fullPath.split('/')
  return rest.join('/')
}

function getSlug(fullPath: string): string {
  return getFilePath(fullPath)
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/(\d+[_-])/g, '')
    .replace(/\.mdx/g, '')
}

export async function getDefaultMetadata(fullPath: string): Promise<Metadata> {
  return {
    type: getType(fullPath),
    path: getFilePath(fullPath),
    slug: getSlug(fullPath),
  }
}

async function buildDocument<M extends Metadata, F extends Frontmatter>(
  fullPath: string,
  getMetadata: (fullPath: string, frontmatter: F) => Promise<M>,
): Promise<Document<M, F>> {
  const content = await serialize(await fs.readFile(fullPath, 'utf-8'), {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkSectionize],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [rehypeTOC, tocOptions],
      ],
    },
    parseFrontmatter: true,
  })

  return {
    content,
    frontmatter: content.frontmatter as F,
    metadata: await getMetadata(fullPath, content.frontmatter as F),
  }
}

export async function listDocuments(type: string): Promise<{ [key: string]: string }> {
  return (await globby([path.join(CONTENT_PATH, type, '**/*.mdx')])).reduce(
    (documents: { [key: string]: string }, filePath: string) => ({
      ...documents,
      [getSlug(filePath)]: filePath,
    }),
    {},
  )
}

export async function getDocument<M extends Metadata, F extends Frontmatter>(
  type: string,
  slug: string,
  getMetadata: (fullPath: string, frontmatter: F) => Promise<M>,
): Promise<Document<M, F>> {
  const documents = await listDocuments(type)
  const fullPath = documents[slug]

  return buildDocument<M, F>(fullPath, getMetadata)
}

export async function getDocuments<M extends Metadata, F extends Frontmatter>(
  type: string,
  getMetadata: (fullPath: string, frontmatter: F) => Promise<M>,
): Promise<Document<M, F>[]> {
  const documents = await listDocuments(type)

  return await Promise.all(
    Object.values(documents).map(async (fullPath) => await buildDocument<M, F>(fullPath, getMetadata)),
  )
}
