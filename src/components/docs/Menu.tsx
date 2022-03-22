import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { tableOfContent, TOC, TOCCategory, TOCLink } from '@/lib/toc'
import { allDocs } from '@/contentlayer'

interface DocsMenuCategoryItemProps {
  link: TOCLink
}

function DocsMenuCategoryItem({ link }: DocsMenuCategoryItemProps) {
  const [hasMounted, setHasMounted] = React.useState(false)
  const router = useRouter()
  const isActive = useMemo<boolean>(
    () => router.asPath.match(/([^#?]+)([#?].+)*/)?.[1] == link.url,
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
              : 'text-primary-500 hover:border-primary-400 hover:text-primary-900 dark:text-primary-400 dark:hover:border-primary-500 dark:hover:text-primary-200'
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
      <h5 className="mb-8 font-semibold text-primary-800 dark:text-primary-200 lg:mb-3">
        {category.name}
      </h5>
      <ul className="space-y-6 border-l border-primary-300 dark:border-primary-700 lg:space-y-2">
        {category.links
          .sort((a, b) => a.order - b.order)
          .map((link, i) => (
            <DocsMenuCategoryItem key={`link.${i}`} link={link} />
          ))}
      </ul>
    </li>
  )
}

export function DocsMenu() {
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
