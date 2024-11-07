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

interface Author {
  name: string
  url?: string
}

interface BlogMetadata extends Metadata {
  date: Date
  titleSlug: string
  readingTime: IReadTimeResults
}

interface BlogFrontmatter extends Frontmatter {
  title: string
  description: string
  authors: Author[]
  tags: string[]
  wip?: boolean
}

export interface BlogDocument extends Document<BlogMetadata, BlogFrontmatter> {}

export async function getBlogMetadata(fullPath: string, frontmatter: BlogFrontmatter): Promise<BlogMetadata> {
  return {
    ...(await getDefaultMetadata(fullPath)),
    titleSlug: frontmatter.title.toLowerCase().replace(/ /g, '-').replace(/\./g, ''),
    date: new Date(fullPath.match(/^content\/blog\/(\d{4}-\d{2}-\d{2}).*/)?.[1] || ''),
    readingTime: readingTime(await fs.readFile(fullPath, 'utf-8')),
  }
}

export async function listBlogDocuments(): Promise<{ [key: string]: string }> {
  return await listDocuments('blog')
}

export async function getBlogDocument(slug: string): Promise<BlogDocument> {
  return await getDocument('blog', slug, getBlogMetadata)
}

export async function getBlogDocuments(): Promise<BlogDocument[]> {
  return await getDocuments('blog', getBlogMetadata)
}
