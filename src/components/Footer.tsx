import { FlamaIcon } from '@/components/icons'
import React from 'react'
import Link from '@/components/Link'

const links = [
  {
    name: 'Getting Started',
    links: [
      { name: 'Installation', url: '/docs/getting-started/installation' },
      { name: 'Quickstart', url: '/docs/getting-started/quickstart' },
    ],
  },
  {
    name: 'Core Concepts',
    links: [],
  },
  {
    name: 'Adopting',
    links: [],
  },
  {
    name: 'About Flama',
    links: [
      { name: 'GitHub', url: 'https://github.com/perdy/flama' },
      { name: 'Releases', url: 'https://github.com/perdy/flama/releases' },
      { name: 'Issues', url: 'https://github.com/perdy/flama/issues' },
      { name: 'Contribute', url: '/docs/contributing/how-to-contribute' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[90rem] space-y-16 divide-y divide-primary-300 px-4 pb-16 pt-8 text-sm leading-6 dark:divide-primary-700 sm:px-6 md:px-8">
      <div className="grid grid-cols-2 gap-x-20 gap-y-10 md:grid-cols-4">
        {links.map((category, i) => (
          <div key={i}>
            <h2 className="font-semibold text-primary-700 dark:text-primary-200">
              {category.name}
            </h2>
            <ul className="mt-3 space-y-2">
              {category.links.map((link, j) => (
                <li key={j}>
                  <Link href={link.url}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-x-2 pt-10 text-brand-500">
        <FlamaIcon className="h-6 w-6 md:h-7 md:w-7" />
        <span className="text-2xl md:text-3xl">Flama</span>
      </div>
    </footer>
  )
}
