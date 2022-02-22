import Link from 'next/link'
import { FlamaIcon, GithubIcon } from '@/components/icons'
import ThemeModeSwitcher from '@/components/ThemeModeSwitcher'
import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline'
import { SearchButton } from '@/components/Search'
import { useCallback, useState } from 'react'

function Logo() {
  return (
    <Link href="/">
      <a className="flex items-center justify-start space-x-2 text-brand-500">
        <FlamaIcon className="h-5 w-5 md:h-6 md:w-6" />
        <span className="align-baseline text-xl lg:text-2xl">Flama</span>
        <span className="sr-only">Flama home page</span>
      </a>
    </Link>
  )
}

function Nav() {
  const entries = [
    { href: '/docs', title: 'Docs' },
    { href: '/blog', title: 'Blog' },
  ]

  return (
    <nav className="text-lg text-zinc-600 dark:text-zinc-400 md:font-medium">
      <ul className="flex flex-col gap-4 md:flex-row md:gap-10">
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

function Social() {
  return (
    <div className="flex items-center justify-around md:gap-10">
      <ThemeModeSwitcher className="h-5 w-5 text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500 md:h-6 md:w-6" />
      <a
        href="https://github.com/perdy/flama"
        className="block text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500"
      >
        <span className="sr-only">Flama on GitHub</span>
        <GithubIcon className="h-5 w-5 lg:h-6 lg:w-6" />
      </a>
    </div>
  )
}

export default function Menu() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  return (
    <div className="flex flex-col justify-between gap-10">
      <div className="flex h-5 items-center justify-between lg:h-6">
        <div className="flex justify-start lg:w-1 lg:flex-1">
          <Logo />
        </div>
        <div className="relative hidden items-center justify-between md:flex">
          <div className="pr-16">
            <Nav />
          </div>
          <div className="border-l border-brand-500 pl-16">
            <Social />
          </div>
        </div>
        <div className="relative flex items-center justify-end gap-5 md:hidden">
          <SearchButton className="block text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500">
            <span className="sr-only">Search</span>
            <SearchIcon className="h-5 w-5" />
          </SearchButton>
          <button className="block text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500">
            <span className="sr-only">Menu</span>
            {isOpen ? (
              <XIcon className="h-5 w-5" onClick={onClose} />
            ) : (
              <MenuIcon className="h-5 w-5" onClick={onOpen} />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col justify-around gap-10 md:hidden">
          <Nav />
          <Social />
        </div>
      )}
    </div>
  )
}
