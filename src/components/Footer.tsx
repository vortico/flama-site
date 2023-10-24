import { FlamaIcon } from '@/components/icons'
import Link from '@/components/Link'
import React from 'react'

const links = [
  {
    name: 'Getting Started',
    links: [
      { name: 'Installation', url: '/docs/getting-started/installation/' },
      { name: 'Quickstart', url: '/docs/getting-started/quickstart/' },
    ],
  },
  {
    name: 'Interact with Flama',
    links: [
      { name: 'Run applications', url: '/docs/flama-cli/run/' },
      { name: 'Serve machine-learning models', url: '/docs/flama-cli/serve/' },
      { name: 'Start with definition files', url: '/docs/flama-cli/start/' },
    ],
  },
  {
    name: 'Core Concepts',
    links: [
      { name: 'Flama Artifacts', url: '/docs/machine-learning-api/packaging-models/' },
      { name: 'Flama Applications', url: '/docs/machine-learning-api/add-models/' },
      { name: 'Model Resources', url: '/docs/machine-learning-api/model-resource/' },
      { name: 'Model Components', url: '/docs/machine-learning-api/model-components/' },
    ],
  },
  {
    name: 'About Flama',
    links: [
      { name: 'GitHub', url: 'https://github.com/vortico/flama/' },
      { name: 'Releases', url: 'https://github.com/vortico/flama/releases/' },
      { name: 'Issues', url: 'https://github.com/vortico/flama/issues/' },
      { name: 'Contribute', url: '/docs/contributing/how-to-contribute/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[90rem] space-y-16 divide-y divide-primary-300 px-4 pb-16 pt-8 text-sm leading-6 dark:divide-primary-700 sm:px-6 md:px-8">
      <div className="grid grid-cols-2 gap-x-20 gap-y-10 md:grid-cols-4">
        {links.map((category, i) => (
          <div key={i}>
            <h2 className="font-semibold text-primary-700 dark:text-primary-200">{category.name}</h2>
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
