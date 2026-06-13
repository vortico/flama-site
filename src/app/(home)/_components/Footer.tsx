import React from 'react'

import { Link } from '@/components/elements'
import { FlamaIcon, VorticoIcon } from '@/components/icons'
import { VorticoName } from '@/components/names'

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
      { name: 'Serve models', url: '/docs/flama-cli/serve/' },
      { name: 'Get models', url: '/docs/flama-cli/get/' },
      { name: 'Upgrade codebases', url: '/docs/flama-cli/upgrade/' },
    ],
  },
  {
    name: 'Predictive AI',
    links: [
      { name: 'Packaging models', url: '/docs/predictive-ai/packaging-models/' },
      { name: 'Adding models', url: '/docs/predictive-ai/add-models/' },
      { name: 'Model Resources', url: '/docs/predictive-ai/model-resource/' },
      { name: 'Model Components', url: '/docs/predictive-ai/model-components/' },
    ],
  },
  {
    name: 'Generative AI',
    links: [
      { name: 'Serving LLMs', url: '/docs/generative-ai/serving-llms/' },
      { name: 'Chatbot application', url: '/docs/generative-ai/chatbot-application/' },
      { name: 'Model Context Protocol', url: '/docs/generative-ai/model-context-protocol/' },
      { name: 'Getting models', url: '/docs/generative-ai/getting-models/' },
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
      <div className="grid grid-cols-2 gap-x-20 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
        {links.map((category, i) => (
          <div key={i}>
            <h2 className="font-semibold text-primary-700 dark:text-primary-200">{category.name}</h2>
            <ul className="mt-3 space-y-2">
              {category.links.map((link, j) => (
                <li key={j}>
                  <Link
                    href={link.url}
                    className="text-primary-600 transition-colors duration-200 hover:text-brand-500 dark:text-primary-300 dark:hover:text-brand-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-2 text-brand-500">
          <FlamaIcon className="h-6 w-6 md:h-7 md:w-7" />
          <span className="text-2xl md:text-3xl">Flama</span>
        </div>
        <Link
          href="https://vortico.tech"
          className="flex items-center gap-1 text-primary-500 transition-colors duration-200 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
          aria-label="Made by Vortico"
        >
          <span className="text-sm">Made by</span>
          <VorticoIcon className="h-5 w-5" />
          <VorticoName />
        </Link>
      </div>
    </footer>
  )
}
