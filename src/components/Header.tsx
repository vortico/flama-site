import Link from 'next/link'
import { FlamaIcon, GithubIcon } from '~/components/icons'
import ThemeModeSwitcher from '~/components/ThemeModeSwitcher'

function Nav() {
  const entries = [
    { href: '/docs', title: 'Docs' },
    { href: '/blog', title: 'Blog' },
  ]

  return (
    <nav className="pr-16 font-medium text-zinc-600 dark:text-zinc-400">
      <ul className="flex space-x-10">
        {entries.map((entry) => (
          <li key={entry.href}>
            <Link href={entry.href}>
              <a className="hover:text-brand-500 dark:hover:text-brand-400">
                {entry.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Menu() {
  return (
    <div className="max-w-8xl mx-auto border-b border-brand-500 px-4 sm:px-8">
      <div className="flex items-center justify-between py-6">
        <div className="flex justify-start lg:w-1 lg:flex-1">
          <Link href="">
            <a className="flex items-center justify-start space-x-2 text-brand-500">
              <span className="sr-only">Flama home page</span>
              <FlamaIcon className="h-6 w-6" />
              <span className="text-3xl">Flama</span>
            </a>
          </Link>
        </div>
        <div className="relative hidden items-center justify-between md:flex">
          <Nav />
          <div className="flex items-center space-x-10 border-l border-brand-500 pl-16">
            <ThemeModeSwitcher className="h-6 w-6 text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-300" />
            <a
              href="https://github.com/perdy/flama"
              className="block text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-300"
            >
              <span className="sr-only">Flama on GitHub</span>
              <GithubIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  return (
    <div className="relative">
      <Menu />
    </div>
  )
}
