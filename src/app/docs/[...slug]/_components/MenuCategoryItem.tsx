'use client'

import React, { useMemo } from 'react'

import { usePathname } from 'next/navigation'

import { Link } from '@/components/elements'
import { type TOCLink } from '@/lib/toc'

import { type DocsDocument } from '../../mdx'

interface MenuCategoryItemProps {
  link: TOCLink<DocsDocument>
}

export default function MenuCategoryItem({ link }: MenuCategoryItemProps) {
  const pathname = usePathname()
  const isActive = useMemo<boolean>(() => pathname.match(/([^#?]+)([#?].+)*/)?.[1] == link.url, [pathname, link.url])

  return (
    <li>
      <Link
        href={link.url}
        className={`-ml-px flex items-center border-l border-transparent pl-4 transition-colors duration-200 ${
          isActive
            ? 'border-current font-semibold text-brand-500 dark:text-brand-500'
            : 'text-primary-500 hover:border-primary-400 hover:text-primary-900 dark:text-primary-400 dark:hover:border-primary-500 dark:hover:text-primary-200'
        }`}
      >
        <span>{link.title}</span>
        {link.content.frontmatter.wip && (
          <span
            className={`ml-3 rounded-sm px-1.5 py-0.5 text-xs shadow-xl ring-1 ring-inset ${
              isActive
                ? 'text-brand-500 ring-brand-500 dark:text-brand-400 dark:ring-brand-400'
                : 'text-primary-500 ring-primary-500 dark:text-primary-400 dark:ring-primary-400'
            }`}
          >
            WIP
          </span>
        )}
      </Link>
    </li>
  )
}
