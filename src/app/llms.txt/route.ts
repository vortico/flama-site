import { getBlogDocuments } from '@/app/blog/mdx'
import { getDocsDocuments, type DocsDocument } from '@/app/docs/mdx'

export const dynamic = 'force-static'

const SITE = 'https://flama.dev'

const INTRO =
  'Flama is a production-ready, open-source Python framework for building Machine Learning APIs, ' +
  'LLM-serving endpoints, and MCP (Model Context Protocol) servers, with a Rust-powered core and ' +
  'automatic OpenAPI documentation.'

function entry(title: string, url: string, description?: string): string {
  return description ? `- [${title}](${url}): ${description}` : `- [${title}](${url})`
}

function groupDocs(docs: DocsDocument[]): { group: string; items: DocsDocument[] }[] {
  const sorted = [...docs].sort(
    (a, b) => a.metadata.groupOrder - b.metadata.groupOrder || a.metadata.order - b.metadata.order,
  )

  return sorted.reduce<{ group: string; items: DocsDocument[] }[]>((groups, document) => {
    const entry = groups.find((group) => group.group === document.metadata.groupName)
    if (entry) {
      entry.items.push(document)
    } else {
      groups.push({ group: document.metadata.groupName, items: [document] })
    }
    return groups
  }, [])
}

export async function GET() {
  const [docs, blog] = await Promise.all([getDocsDocuments(), getBlogDocuments()])

  const lines: string[] = [`# Flama`, ``, `> ${INTRO}`, ``]

  for (const { group, items } of groupDocs(docs)) {
    lines.push(`## ${group}`)
    for (const document of items) {
      lines.push(
        entry(document.frontmatter.title, `${SITE}/docs/${document.metadata.slug}/`, document.frontmatter.description),
      )
    }
    lines.push(``)
  }

  const sortedBlog = [...blog].sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime())
  lines.push(`## Blog`)
  for (const document of sortedBlog) {
    lines.push(
      entry(document.frontmatter.title, `${SITE}/blog/${document.metadata.slug}/`, document.frontmatter.description),
    )
  }
  lines.push(``)

  lines.push(`## Optional`)
  lines.push(`- [Full framework reference](${SITE}/llms-full.txt): Complete Flama API surface in a single file`)
  lines.push(``)

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
