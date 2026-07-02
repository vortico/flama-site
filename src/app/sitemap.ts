import { promises as fs } from 'fs'

import type { MetadataRoute } from 'next'

import { getBlogDocuments } from '@/app/blog/mdx'
import { getDocsDocuments } from '@/app/docs/mdx'

const SITE = 'https://flama.dev'

async function lastModified(type: string, path: string): Promise<Date> {
  try {
    return (await fs.stat(`content/${type}/${path}`)).mtime
  } catch {
    return new Date()
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [docs, blog] = await Promise.all([getDocsDocuments(), getBlogDocuments()])

  const staticPages: MetadataRoute.Sitemap = ['', 'docs', 'blog'].map((page) => ({
    url: `${SITE}/${page ? `${page}/` : ''}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  const docPages: MetadataRoute.Sitemap = await Promise.all(
    docs.map(async (document) => ({
      url: `${SITE}/docs/${document.metadata.slug}/`,
      lastModified: await lastModified(document.metadata.type, document.metadata.path),
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  )

  const blogPages: MetadataRoute.Sitemap = blog.map((document) => ({
    url: `${SITE}/blog/${document.metadata.slug}/`,
    lastModified: document.metadata.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...docPages, ...blogPages]
}
