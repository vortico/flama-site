import { promises as fs } from 'fs'
import path from 'path'

import { globby } from 'globby'
import { compileMDX } from 'next-mdx-remote/rsc'

const CONTENT_PATH = 'content'

export interface Frontmatter {}

export interface Metadata {
  type: string
  path: string
  slug: string
}

export interface Document<M extends Metadata = Metadata, F extends Frontmatter = Frontmatter> {
  source: string
  metadata: M
  frontmatter: F
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
  const source = await fs.readFile(fullPath, 'utf-8')

  const { frontmatter } = await compileMDX<F>({ source, options: { parseFrontmatter: true } })

  return { source, frontmatter, metadata: await getMetadata(fullPath, frontmatter) }
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
