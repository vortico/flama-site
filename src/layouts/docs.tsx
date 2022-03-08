import React, { ReactNode, useMemo } from 'react'
import { allDocs } from '@/contentlayer'
import { Docs as IDocs } from '@/contentlayer/types'
import { tableOfContent, TOC, TOCCategory, TOCLink } from '@/lib/toc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SidebarLayout from '@/layouts/sidebar'

interface DocsMenuCategoryItemProps {
  link: TOCLink
}

function DocsMenuCategoryItem({ link }: DocsMenuCategoryItemProps) {
  const [hasMounted, setHasMounted] = React.useState(false)
  const router = useRouter()
  const isActive = useMemo<boolean>(
    () => router.asPath == link.url,
    [router.asPath, link.url]
  )

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <li>
      <Link href={link.url}>
        <a
          className={`-ml-px block border-l border-transparent pl-4 ${
            isActive
              ? 'border-current font-semibold text-brand-500 dark:text-brand-400'
              : 'text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-300'
          }`}
        >
          {link.title}
        </a>
      </Link>
    </li>
  )
}

interface DocsMenuCategoryProps {
  category: TOCCategory
}

function DocsMenuCategory({ category }: DocsMenuCategoryProps) {
  return (
    <li>
      <h5 className="mb-8 font-semibold text-zinc-800 dark:text-zinc-200 lg:mb-3">
        {category.name}
      </h5>
      <ul className="space-y-6 border-l border-zinc-300 dark:border-zinc-700 lg:space-y-2">
        {category.links
          .sort((a, b) => a.order - b.order)
          .map((link, i) => (
            <DocsMenuCategoryItem key={`link.${i}`} link={link} />
          ))}
      </ul>
    </li>
  )
}

function DocsMenu() {
  const links = allDocs.map((docs) => ({
    title: docs.title,
    path: docs.path,
    url: docs.url,
    order: docs.order,
  }))
  const toc = useMemo<TOC>(() => tableOfContent(links), [links])

  return (
    <ul className="space-y-12 lg:space-y-8">
      {toc.categories
        .sort((a, b) => a.order - b.order)
        .map((category, i) => (
          <DocsMenuCategory key={`category.${i}`} category={category} />
        ))}
    </ul>
  )
}

interface DocLayoutProps {
  docs: IDocs
  children: ReactNode
}

export function DocsLayout({ docs, children }: DocLayoutProps) {
  return (
    <SidebarLayout menu={<DocsMenu />}>
      <article className="prose dark:prose-dark">
        <section>
          <div className="my-2 flex items-center justify-between">
            <span className="font-semibold text-brand-500">{docs.group}</span>
            <span className="italic">
              ~ {Math.round(docs.readingTime.minutes)} min read
            </span>
          </div>
          <h1 id={docs.titleSlug} className="scroll-mt-[var(--scroll-mt)]">
            {docs.title}
          </h1>
        </section>
        {children}
      </article>
    </SidebarLayout>
  )
}
