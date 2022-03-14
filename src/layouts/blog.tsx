import React, { ReactNode } from 'react'
import { Blog as IBlog } from '@/contentlayer/types'
import PlainLayout from '@/layouts/plain'
import { BlogContext } from '@/components/blog/Context'
import { Menu } from '@/components/blog/Menu'
import Footer from '@/components/home/Footer'

interface BlogLayoutProps {
  blog: IBlog
  children: ReactNode
}

export function BlogLayout({ blog, children }: BlogLayoutProps) {
  return (
    <BlogContext.Provider value={{ blog }}>
      <PlainLayout>
        <header className="space-y-4 pt-16 pb-9 sm:pb-16 sm:text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary-700 dark:text-primary-200 sm:text-4xl">
            {blog.title}
          </h1>
          <p className="text-lg">{blog.description}</p>
        </header>
        <main className="mx-auto mb-20 max-w-5xl space-y-16 sm:mb-32 md:mb-40">
          <article className="relative mx-auto max-w-3xl xl:grid xl:max-w-none xl:grid-cols-[1fr_50rem] xl:gap-x-8 xl:pt-10">
            <Menu />
            <div className="prose dark:prose-dark">{children}</div>
          </article>
        </main>
        <Footer />
      </PlainLayout>
    </BlogContext.Provider>
  )
}
