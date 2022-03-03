import React, { ReactNode, useMemo } from 'react'
import { allDocs } from '@/contentlayer'
import { tableOfContent, TOC, TOCCategory, TOCLink } from '@/lib/toc'
import Link from 'next/link'
import BaseLayout from '@/layouts/base'
import { useRouter } from 'next/router'
import { QuickSearchButton } from '@/components/QuickSearchButton'

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
    url: `/docs/${docs.slug}`,
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
  title: string
  titleSlug: string
  group: string
  words: string
  readingTime: number
  children: ReactNode
}

export function DocsLayout({
  title,
  titleSlug,
  group,
  readingTime,
  children,
}: DocLayoutProps) {
  return (
    <BaseLayout>
      <div className="fixed bottom-0 top-16 left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-[19.5rem] overflow-y-auto px-8 pb-10 md:top-20 lg:block">
        <div className="fixed">
          <div className="bg-zinc-100 pb-px pt-8 dark:bg-zinc-800">
            <QuickSearchButton className="dark:highlight-white/5 hidden h-8 w-full items-center space-x-3 rounded-full bg-white px-4 text-left shadow-sm ring-1 ring-brand-900/10 hover:ring-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-zinc-700 dark:ring-0 dark:hover:bg-zinc-600 sm:flex" />
          </div>
          <div className="h-10 bg-gradient-to-b from-zinc-100 to-transparent dark:from-zinc-800" />
        </div>
        <nav className="pt-28 pb-10">
          <DocsMenu />
        </nav>
      </div>
      <main className="mt-8 max-w-5xl lg:pl-[20rem]">
        <article className="prose dark:prose-dark">
          <section>
            <div className="my-2 flex items-center justify-between">
              <span className="font-semibold text-brand-500">{group}</span>
              <span className="italic">
                ~ {Math.round(readingTime)} min read
              </span>
            </div>
            <h1 id={titleSlug} className="scroll-mt-[var(--scroll-mt)]">
              {title}
            </h1>
          </section>
          {children}
        </article>
      </main>
    </BaseLayout>
  )
}
