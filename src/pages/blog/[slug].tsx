import { BlogLayout } from '@/layouts/blog'
import { allBlogs, Blog as IBlog } from '@/contentlayer'
import { useMDXComponent } from 'next-contentlayer/hooks' // eslint-disable-line import/no-unresolved
import { H1, H2, H3, H4, H5, H6 } from '@/components/mdx/header'
import { Code, Pre } from '@/components/mdx/code'
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
      <NextSeo
        title={blog.title}
        canonical={`https://flama.dev/blog/${blog.slug}`}
      />
      <BlogLayout blog={blog}>
        <Component
          components={{
            nav: () => <></>,
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            h5: H5,
            h6: H6,
            pre: Pre,
            code: Code,
          }}
        />
      </BlogLayout>
    </>
  )
}
