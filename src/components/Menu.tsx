import Link from 'next/link'
import { FlamaIcon, GithubIcon } from '@/components/icons'
import ThemeModeSwitcher from '@/components/ThemeModeSwitcher'
import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline'
import { SearchButton } from '@/components/Search'
import React, { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

function Logo() {
  return (
    <Link href="/">
      <a
        className="flex items-center justify-start gap-2 text-brand-500"
        aria-label="Flama logo"
      >
        <FlamaIcon className="h-5 w-5 md:h-6 md:w-6" />
        <span className="align-baseline text-xl lg:text-2xl">Flama</span>
      </a>
    </Link>
  )
}

function NavList({ ...props }: React.ComponentProps<'ul'>) {
  const entries = [
    { href: '/docs', title: 'Docs' },
    { href: '/blog', title: 'Blog' },
  ]

  return (
    <ul {...props}>
      {entries.map((entry) => (
        <li key={entry.href}>
          <Link href={entry.href}>
            <a className="block hover:text-brand-500 dark:hover:text-brand-400">
              {entry.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function SocialList() {
  return (
    <>
      <ThemeModeSwitcher className="h-5 w-5 text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500 md:h-6 md:w-6" />
      <a
        href="https://github.com/perdy/flama"
        className="block text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500"
        aria-label="Flama on Github"
      >
        <GithubIcon className="h-5 w-5 lg:h-6 lg:w-6" />
      </a>
    </>
  )
}

interface FloatMenuProps {
  onClose: () => void
}

function FloatMenu({ onClose }: FloatMenuProps) {
  return (
    <div
      className="fixed top-0 left-0 z-[200] h-screen w-screen p-4 sm:p-6 md:p-[10vh] lg:p-[12vh]"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-zinc-900/80"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="fixed top-5 right-5 w-full max-w-xs rounded bg-zinc-100 py-6 text-base font-semibold text-zinc-600 shadow-lg dark:bg-zinc-800 dark:text-zinc-400">
        <button className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500">
          <XIcon
            className="h-5 w-5"
            onClick={onClose}
            aria-label="close menu"
          />
        </button>
        <nav className="px-6 pb-6">
          <NavList className="flex flex-col gap-6 text-lg font-medium text-zinc-600 dark:text-zinc-400 " />
        </nav>
        <div className="flex items-center justify-around gap-10 border-t border-brand-500 px-6 pt-6">
          <SocialList />
        </div>
      </div>
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
    <div className="relative flex flex-col justify-between gap-10">
      <div className="flex h-5 items-center justify-between lg:h-6">
        <div className="flex justify-start lg:w-1 lg:flex-1">
          <Logo />
        </div>
        <div className="hidden items-center justify-between md:flex">
          <nav className="pr-16">
            <NavList className="flex flex-row gap-10 text-lg font-medium text-zinc-600 dark:text-zinc-400" />
          </nav>
          <div className="flex items-center justify-around gap-10 border-l border-brand-500 pl-16">
            <SocialList />
          </div>
        </div>
        <div className="flex items-center justify-end gap-5 md:hidden">
          <SearchButton className="block text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500">
            <SearchIcon className="h-5 w-5" aria-label="Search" />
          </SearchButton>
          <button className="block text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-500">
            <MenuIcon
              className="h-5 w-5"
              onClick={onOpen}
              aria-label="Open menu"
            />
          </button>
        </div>
      </div>
      {isOpen && createPortal(<FloatMenu onClose={onClose} />, document.body)}
    </div>
  )
}
