import { Link, LinkButton } from '@/components/elements'

import { type BlogDocument } from '../mdx'

export default function BlogPreview({ document }: { document: BlogDocument }) {
  const dateFormatter = Intl.DateTimeFormat(['en'], {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  })

  return (
    <article className="relative flex max-w-3xl flex-col space-y-4 lg:ml-auto xl:w-[50rem] xl:max-w-none">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-primary-700 dark:text-primary-200">
          <Link href={`/blog/${document.metadata.slug}/`}>{document.frontmatter.title}</Link>
        </h3>
        <div className="text-sm italic leading-7 dark:text-primary-400 lg:absolute lg:right-full lg:top-0 lg:mr-8 lg:whitespace-nowrap">
          <time dateTime={document.metadata.date.toString()}>
            {dateFormatter.format(new Date(document.metadata.date))}
          </time>
        </div>
      </div>
      <div>
        <p>{document.frontmatter.description}</p>
      </div>
      <div className="h-6">
        <LinkButton href={`/blog/${document.metadata.slug}`} text="Read More" rightIcon />
      </div>
    </article>
  )
}
