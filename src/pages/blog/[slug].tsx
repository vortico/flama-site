import { BlogLayout } from '@/layouts/blog'
import { allBlogs, Blog as IBlog } from '@/contentlayer'
import { NextSeo } from 'next-seo'
import MDXComponent from '@/components/mdx/MDXComponent'

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
  return (
    <>
      <NextSeo
        title={blog.title}
        canonical={`https://flama.dev/blog/${blog.slug}`}
      />
      <BlogLayout blog={blog}>
        <MDXComponent
          code={blog.body.code}
          components={{
            nav: () => <></>,
          }}
        />
      </BlogLayout>
    </>
  )
}
