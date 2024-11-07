import React from 'react'

import { type TOCCategory } from '@/lib/toc'

import { type DocsDocument } from '../../mdx'
import MenuCategoryItem from './MenuCategoryItem'

interface MenuCategoryProps {
  category: TOCCategory<DocsDocument>
}

export default function MenuCategory({ category }: MenuCategoryProps) {
  return (
    <li>
      <h5 className="mb-8 font-semibold text-primary-800 dark:text-primary-200 lg:mb-3">{category.name}</h5>
      <ul className="space-y-6 border-l border-primary-300 dark:border-primary-700 lg:space-y-2">
        {category.links
          .sort((a, b) => a.order - b.order)
          .map((link, i) => (
            <MenuCategoryItem key={`link.${i}`} link={link} />
          ))}
      </ul>
    </li>
  )
}
