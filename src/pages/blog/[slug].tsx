import { BlogLayout } from '@/layouts/blog'
import { allBlogs } from '@/contentlayer'
import type { Blog as IBlog } from '@/contentlayer/types'
import { useMDXComponent } from 'next-contentlayer/hooks' // eslint-disable-line import/no-unresolved
import { withHeader } from '@/components/mdx/header'
import { NextSeo } from 'next-seo'

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((blog) => ({ params: { slug: blog.slug } })),
    fallback: false,
  }
}

interface StaticProps {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: StaticProps) {
  const blog = allBlogs.find((blog) => blog.slug === params.slug)
  return { props: { blog } }
}

interface BlogProps {
  blog: IBlog
}

export default function Blog({ blog }: BlogProps) {
  const Component = useMDXComponent(blog.body.code)

  return (
    <>
      <NextSeo title={blog.title} canonical={`https://flama.dev/${blog.url}`} />
      <BlogLayout blog={blog}>
        <Component
          components={{
            nav: () => <></>,
            h1: withHeader({ level: 1 }),
            h2: withHeader({ level: 2 }),
            h3: withHeader({ level: 3 }),
            h4: withHeader({ level: 4 }),
            h5: withHeader({ level: 5 }),
            h6: withHeader({ level: 6 }),
          }}
        />
      </BlogLayout>
    </>
  )
}
