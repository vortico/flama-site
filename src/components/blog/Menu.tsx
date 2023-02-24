import { BlogContext } from '@/components/blog/Context'
import { IconChevronsLeft } from '@tabler/icons-react'
import Link from 'next/link'
import React, { useContext } from 'react'

export function Menu() {
  const dateFormatter = Intl.DateTimeFormat(['en'], {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  })

  const { blog } = useContext(BlogContext)

  return (
    <div className="mb-16 text-sm leading-6 xl:mb-0">
      <div className="mb-5 hidden border-b border-primary-200 pb-5 dark:border-primary-200/5 xl:block">
        <Link
          href="/blog"
          className="group flex items-center space-x-2 text-primary-600 hover:text-brand-500 dark:text-primary-400 dark:hover:text-brand-400"
        >
          <IconChevronsLeft className="h-4" />
          <span className="font-semibold">Go back to blog</span>
        </Link>
      </div>
      <div className="justify-center space-y-4">
        <div>
          <h5 className="mb-4 text-primary-700 dark:text-primary-200">{`${
            blog?.authors && blog?.authors.length > 1 ? 'Authors' : 'Author'
          }`}</h5>
          <div className="space-y-4">
            {blog?.authors.map((author, i) => (
              <div key={i} className="flex-col items-center pl-4 font-medium">
                {author.url ? <a href={author.url}>{author.name}</a> : <div>{author.name}</div>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h5 className="mb-4 text-primary-700 dark:text-primary-200">Publication</h5>
          <div className="pl-4">
            <time dateTime={blog?.date}>{dateFormatter.format(new Date(blog?.date))}</time>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-primary-700 dark:text-primary-200">Reading Time</h5>
          <div className="pl-4">
            <span>~ {Math.round(blog?.readingTime.minutes)} min read</span>
          </div>
        </div>
      </div>
    </div>
  )
}
