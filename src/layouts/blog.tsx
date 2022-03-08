import React, { ReactNode } from 'react'
import { Blog as IBlog, Author as IAuthor } from '@/contentlayer/types'
import BaseLayout from '@/layouts/base'
import Link from 'next/link'

interface BlogMenuProps {
  authors: IAuthor[]
  date: string
  readingTime: number
}

function BlogMenu({ authors, date, readingTime }: BlogMenuProps) {
  const dateFormatter = Intl.DateTimeFormat(['en'], {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  })

  return (
    <div className="mb-16 text-sm leading-6 xl:mb-0">
      <div className="mb-5 hidden border-b border-zinc-200 pb-5 dark:border-zinc-200/5 xl:block">
        <Link href="/blog">
          <a className="group flex font-semibold text-zinc-600 hover:text-brand-500 dark:text-zinc-400 dark:hover:text-brand-400">
            <svg
              viewBox="0 -9 3 24"
              className="mr-3 h-6 w-auto overflow-visible"
            >
              <path
                d="M3 0L0 3L3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Go back to blog</span>
          </a>
        </Link>
      </div>
      <div className="space-y-4 sm:flex sm:flex-wrap sm:justify-center xl:block">
        <div>
          <h5 className="mb-4 text-zinc-700 dark:text-zinc-200">{`${
            authors.length > 1 ? 'Authors' : 'Author'
          }`}</h5>
          <div className="space-y-4">
            {authors.map((author, i) => (
              <div
                key={i}
                className="flex-col items-center pl-4 font-medium sm:mx-3 xl:mx-0"
              >
                {author.url ? (
                  <a href={author.url}>{author.name}</a>
                ) : (
                  <div>{author.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h5 className="mb-4 text-zinc-700 dark:text-zinc-200">Publication</h5>
          <div className="pl-4">
            <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-zinc-700 dark:text-zinc-200">
            Reading Time
          </h5>
          <div className="pl-4">
            <span>~ {Math.round(readingTime)} min read</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BlogLayoutProps {
  blog: IBlog
  children: ReactNode
}

export function BlogLayout({ blog, children }: BlogLayoutProps) {
  return (
    <BaseLayout>
      <header className="space-y-4 pt-16 pb-9 sm:pb-16 sm:text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-700 dark:text-zinc-200 sm:text-4xl">
          {blog.title}
        </h1>
        <p className="text-lg">{blog.description}</p>
      </header>
      <main className="mx-auto max-w-5xl space-y-16">
        <article className="relative mx-auto max-w-3xl pt-10 xl:grid xl:max-w-none xl:grid-cols-[1fr_50rem] xl:gap-x-8">
          <BlogMenu
            authors={blog.authors}
            date={blog.date}
            readingTime={blog.readingTime.minutes}
          />
          <div className="prose dark:prose-dark">{children}</div>
        </article>
      </main>
    </BaseLayout>
  )
}
