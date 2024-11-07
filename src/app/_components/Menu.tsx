'use client'

import React, { useCallback, useState } from 'react'

import { IconMenu2, IconSearch, IconX } from '@tabler/icons-react'
import { createPortal } from 'react-dom'

import { Link, Tooltip } from '@/components/elements'
import { FlamaIcon, GithubIcon } from '@/components/icons'
import { SearchButton } from '@/components/Search'

import ThemeModeSwitcher from './ThemeModeSwitcher'

const primaryIconClass =
  'text-primary-400 transition-colors duration-200 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400'

function Logo() {
  return (
    <Link href="/" className="flex items-center justify-start gap-2 text-brand-500" aria-label="Flama logo">
      <FlamaIcon className="h-7 w-7 lg:h-8 lg:w-8" />
      <span className="text-xl lg:text-2xl">Flama</span>
    </Link>
  )
}

function NavList({ onClick, ...props }: Omit<React.ComponentProps<'ul'>, 'onClick'> & { onClick?: () => void }) {
  const entries = [
    { href: '/docs/', title: 'Docs' },
    { href: '/blog/', title: 'Blog' },
  ]

  return (
    <ul {...props}>
      {entries.map((entry) => (
        <li key={entry.href} onClick={onClick}>
          <Link
            href={entry.href}
            className="block text-lg font-medium text-primary-600 transition-colors duration-200 hover:text-brand-500 dark:text-primary-400 dark:hover:text-brand-500"
          >
            {entry.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function SocialList() {
  return (
    <>
      <ThemeModeSwitcher className={`h-5 w-5 md:h-6 md:w-6 ${primaryIconClass}`} />
      <a href="https://github.com/vortico/flama" className="relative block" aria-label="Flama on Github">
        <GithubIcon className={`h-5 w-5 lg:h-6 lg:w-6 ${primaryIconClass}`} />
        <Tooltip orientation="bottom-left" className="animate-pulse">
          <div className="whitespace-nowrap p-3 text-left text-sm font-semibold text-primary-100">Gift me a ⭐ !</div>
        </Tooltip>
      </a>
    </>
  )
}

function FloatMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] min-h-screen w-screen p-4 sm:p-6 md:p-[10vh] lg:p-[12vh]"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-primary-900/80"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="relative rounded bg-primary-100 py-6 text-base font-semibold shadow-lg dark:bg-primary-800">
        <button className={`absolute right-5 top-5 flex h-8 w-8 items-center justify-center ${primaryIconClass}`}>
          <IconX className="h-5 w-5" onClick={onClose} aria-label="close menu" />
        </button>
        <nav className="px-6 pb-6">
          <NavList className="flex flex-col gap-6" onClick={onClose} />
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
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex justify-start lg:w-1 lg:flex-1">
          <Logo />
        </div>
        <div className="hidden items-center justify-between lg:flex">
          <nav className="pr-16">
            <NavList className="flex flex-row gap-10" />
          </nav>
          <div className="flex items-center justify-around gap-10 border-l border-brand-500 pl-16">
            <SocialList />
          </div>
        </div>
        <div className="flex items-center justify-end gap-5 lg:hidden">
          <SearchButton className={`block ${primaryIconClass}`} aria-label="Search">
            <IconSearch className="h-5 w-5" />
          </SearchButton>
          <button className={`block ${primaryIconClass}`} onClick={onOpen} aria-label="Open menu">
            <IconMenu2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isOpen && createPortal(<FloatMenu onClose={onClose} />, document.body)}
    </>
  )
}
