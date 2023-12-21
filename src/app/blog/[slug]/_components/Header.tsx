import { BlogDocument } from '../../mdx'

interface HeaderProps {
  document: BlogDocument
}

export default function Header({ document }: HeaderProps) {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight text-primary-700 dark:text-primary-200 sm:text-4xl">
        {document.frontmatter.title}
      </h1>
      <p className="mt-4 text-lg">{document.frontmatter.description}</p>
    </>
  )
}
