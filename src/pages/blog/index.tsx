import Footer from '@/components/Footer'
import Link from '@/components/Link'
import LinkButton from '@/components/LinkButton'
import { allBlogs, Blog as IBlog } from '@/contentlayer'
import PlainLayout from '@/layouts/plain'
import { NextSeo } from 'next-seo'

interface BlogPreviewProps {
  blog: IBlog
}

function BlogPreview({ blog }: BlogPreviewProps) {
  const dateFormatter = Intl.DateTimeFormat(['en'], {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  })
  return (
    <article className="relative flex max-w-3xl flex-col space-y-4 lg:ml-auto xl:w-[50rem] xl:max-w-none">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-primary-700 dark:text-primary-200">
          <Link href={`/blog/${blog.slug}/`}>{blog.title}</Link>
        </h3>
        <div className="text-sm italic leading-7 dark:text-primary-400 lg:absolute lg:top-0 lg:right-full lg:mr-8 lg:whitespace-nowrap">
          <time dateTime={blog.date}>{dateFormatter.format(new Date(blog.date))}</time>
        </div>
      </div>
      <div>
        <p>{blog.description}</p>
      </div>
      <div className="h-6">
        <LinkButton href={`/blog/${blog.slug}`} text="Read More" rightIcon />
      </div>
    </article>
  )
}

export default function Blog() {
  return (
    <>
      <NextSeo title="Blog" canonical="https://flama.dev/blog" />
      <PlainLayout>
        <header className="space-y-4 px-4 pt-16 pb-9 sm:px-6 sm:pb-16 sm:text-center md:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary-700 dark:text-primary-200 sm:text-4xl">
            Blog
          </h1>
          <p className="text-lg">All the latest news about Flama directly from the team.</p>
        </header>
        <main className="mx-auto mb-20 max-w-5xl space-y-16 px-4 sm:mb-32 sm:px-6 md:mb-40 md:px-8">
          {allBlogs.map((blog, i) => (
            <BlogPreview key={i} blog={blog} />
          ))}
        </main>
        <Footer />
      </PlainLayout>
    </>
  )
}
