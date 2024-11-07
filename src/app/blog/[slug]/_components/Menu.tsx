import React from 'react'

import { IconChevronsLeft } from '@tabler/icons-react'

import { Link } from '@/components/elements'

import { type BlogDocument } from '../../mdx'

function BackButton() {
  return (
    <Link
      href="/blog/"
      className="group flex items-center space-x-2 text-primary-600 transition-colors duration-200 hover:text-brand-500 dark:text-primary-300 dark:hover:text-brand-500"
    >
      <IconChevronsLeft className="h-4" />
      <span className="font-semibold">Go back to blog</span>
    </Link>
  )
}

function Metadata({ document }: { document: BlogDocument }) {
  const dateFormatter = Intl.DateTimeFormat(['en'], { month: 'long', year: 'numeric', day: 'numeric' })

  return (
    <header className="flex w-full flex-col justify-center gap-12 md:flex-row xl:flex-col">
      <div>
        <h5 className="mb-4 text-primary-700 dark:text-primary-200">{`${
          document.frontmatter.authors && document.frontmatter.authors.length > 1 ? 'Authors' : 'Author'
        }`}</h5>
        <div className="space-y-4">
          {document.frontmatter.authors.map((author, i) => (
            <div key={i} className="flex-col items-center pl-4 text-sm">
              {author.url ? <a href={author.url}>{author.name}</a> : <div>{author.name}</div>}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h5 className="mb-4 text-primary-700 dark:text-primary-200">Publication</h5>
        <div className="pl-4 text-sm">
          <time dateTime={document.metadata.date.toString()}>{dateFormatter.format(document.metadata.date)}</time>
        </div>
      </div>
      <div>
        <h5 className="mb-4 text-primary-700 dark:text-primary-200">Reading Time</h5>
        <div className="pl-4 text-sm">
          <span>~ {Math.round(document.metadata.readingTime.minutes)} min read</span>
        </div>
      </div>
    </header>
  )
}

interface MenuProps {
  document: BlogDocument
}

export default function Menu({ document }: MenuProps) {
  return (
    <div className="mb-4 flex flex-col md:mb-8 xl:mb-0">
      <div className="mb-5 hidden border-b border-primary-200 pb-5 dark:border-primary-200/5 xl:block">
        <BackButton />
      </div>
      <div className="w-full">
        <Metadata document={document} />
      </div>
    </div>
  )
}
