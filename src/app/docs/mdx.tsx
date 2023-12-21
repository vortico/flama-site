import { promises as fs } from 'fs'

import readingTime, { type IReadTimeResults } from 'reading-time'

import {
  getDefaultMetadata,
  getDocument,
  getDocuments,
  listDocuments,
  type Document,
  type Frontmatter,
  type Metadata,
} from '@/lib/mdx'

interface DocsMetadata extends Metadata {
  order: number
  groupName: string
  groupOrder: number
  groupSlug: string
  titleSlug: string
  readingTime: IReadTimeResults
}

interface DocsFrontmatter extends Frontmatter {
  title: string
  description: string
  tags: string[]
  wip?: boolean
}

export interface DocsDocument extends Document<DocsMetadata, DocsFrontmatter> {}

export async function getDocsMetadata(fullPath: string, frontmatter: DocsFrontmatter): Promise<DocsMetadata> {
  return {
    ...(await getDefaultMetadata(fullPath)),
    order: parseInt(fullPath.match(/^content\/docs\/.*\/(\d+)-.*/)?.[1] || ''),
    groupName: fullPath.match(/^content\/docs\/\d+-(.*)\/.*/)?.[1] || '',
    groupOrder: parseInt(fullPath.match(/^content\/docs\/(\d+)-.*\/.*/)?.[1] || ''),
    groupSlug:
      fullPath
        .match(/^content\/docs\/\d+-(.*)\/.*/)?.[1]
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/\./g, '') || '',
    titleSlug: frontmatter.title.toLowerCase().replace(/ /g, '-').replace(/\./g, ''),
    readingTime: readingTime(await fs.readFile(fullPath, 'utf-8')),
  }
}

export async function listDocsDocuments(): Promise<{ [key: string]: string }> {
  return await listDocuments('docs')
}

export async function getDocsDocument(slug: string): Promise<DocsDocument> {
  return await getDocument('docs', slug, getDocsMetadata)
}

export async function getDocsDocuments(): Promise<DocsDocument[]> {
  return await getDocuments('docs', getDocsMetadata)
}
