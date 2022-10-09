import React, { ReactNode } from 'react'
import { Blog as IBlog } from '@/contentlayer'
import PlainLayout from '@/layouts/plain'
import { BlogContext } from '@/components/blog/Context'
import { Menu } from '@/components/blog/Menu'
import Footer from '@/components/Footer'

interface BlogLayoutProps {
  blog: IBlog
  children: ReactNode
}

export function BlogLayout({ blog, children }: BlogLayoutProps) {
  return (
    <BlogContext.Provider value={{ blog }}>
      <PlainLayout>
        <header className="mb-9 px-4 pt-16 sm:mb-16 sm:px-6 sm:text-center md:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary-700 dark:text-primary-200 sm:text-4xl">
            {blog.title}
          </h1>
          <p className="mt-4 text-lg">{blog.description}</p>
        </header>
        <main className="mx-auto mb-20 max-w-[90rem] space-y-16 sm:mb-32 md:mb-40">
          <article className="relative xl:flex">
            <div className="w-72 px-4 sm:px-6 md:px-8 xl:flex-none">
              <Menu />
            </div>
            <div className="prose px-4 dark:prose-dark sm:px-6 md:px-8">{children}</div>
          </article>
        </main>
        <Footer />
      </PlainLayout>
    </BlogContext.Provider>
  )
}
