import React from 'react'

import { IconBolt, IconBrain, IconRocket, IconTerminal2, IconTopologyStar3, IconWand } from '@tabler/icons-react'
import { Metadata } from 'next'

import { LinkButton } from '@/components/elements'
import { FlamaName } from '@/components/names'

interface DocsDashboardItemProps {
  icon: React.ReactNode
  title: string
  description: React.ReactNode
  url: string
}

function DocsDashboardItem({ icon, title, description, url }: DocsDashboardItemProps) {
  return (
    <div className="group flex h-full flex-col rounded-lg border border-primary-200 bg-white p-8 transition-all duration-200 hover:border-brand-300 hover:shadow-lg dark:border-primary-700 dark:bg-primary-900 dark:hover:border-brand-600">
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-500/90 p-2.5 text-primary-100 shadow ring-1 ring-primary-900/30 transition-transform duration-200 group-hover:scale-110 dark:bg-brand-500/80 dark:text-primary-800">
        {icon}
      </div>
      <h2 className="mt-5 text-xl font-semibold text-primary-800 dark:text-primary-200">{title}</h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-primary-500 dark:text-primary-400">{description}</p>
      <div className="mt-6 h-8">
        <LinkButton href={url} text="Read more" rightIcon />
      </div>
    </div>
  )
}

function DocsDashboard() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <DocsDashboardItem
        icon={<IconRocket className="h-full w-full" />}
        title="Quickstart"
        description={
          <>
            Follow this guide to develop your first <strong>API</strong>, and explore the main functionality offered by{' '}
            <FlamaName />. Learn how to create a new project, define your first <strong>endpoint</strong>, and run your
            API locally.
          </>
        }
        url="/docs/getting-started/quickstart/"
      />
      <DocsDashboardItem
        icon={<IconBolt className="h-full w-full" />}
        title="Fundamentals"
        description={
          <>
            Deep dive into the foundational building blocks of <FlamaName />. Learn how <strong>applications</strong>,
            routes, schemas, <strong>components</strong>, modules, middlewares, endpoints, and resources work together
            to form a coherent ASGI application.
          </>
        }
        url="/docs/fundamentals/applications/"
      />
      <DocsDashboardItem
        icon={<IconBrain className="h-full w-full" />}
        title="ML APIs"
        description={
          <>
            Learn how to package your <strong>ML models</strong> as lightweight binary files, integrate them into your
            API, and customise the interaction with models through <strong>Components</strong> and{' '}
            <strong>Resources</strong> for full control over their lifecycle.
          </>
        }
        url="/docs/machine-learning-api/packaging-models/"
      />
      <DocsDashboardItem
        icon={<IconTerminal2 className="h-full w-full" />}
        title="CLI"
        description={
          <>
            Discover the <FlamaName /> <strong>command line interface</strong>, and uncover the power of serving ML
            models codeless. This guide shows how to run an API locally, <strong>serve ML models</strong>, and interact
            with them, without typing a single line of code.
          </>
        }
        url="/docs/flama-cli/run/"
      />
      <DocsDashboardItem
        icon={<IconWand className="h-full w-full" />}
        title="Advanced"
        description={
          <>
            Explore advanced features such as <strong>configuration</strong> management, pagination, error handling,
            background tasks, lifespan events, <strong>authentication</strong> with JWT, and other production-ready
            patterns for building robust APIs.
          </>
        }
        url="/docs/advanced-topics/configuration/"
      />
      <DocsDashboardItem
        icon={<IconTopologyStar3 className="h-full w-full" />}
        title="Domain Driven Design"
        description={
          <>
            Place your <strong>business domain</strong> at the centre of your architecture. Learn how to apply
            Domain-Driven Design patterns within <FlamaName />, including <strong>repositories</strong>, workers, and
            domain models, to build maintainable systems.
          </>
        }
        url="/docs/domain-driven-design/introduction/"
      />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Flama documentation',
  alternates: {
    canonical: `/docs/`,
  },
}

export default function Docs() {
  return (
    <>
      <header className="space-y-4 px-4 pb-9 pt-16 sm:px-6 sm:pb-16 sm:text-center md:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-700 dark:text-primary-200 sm:text-4xl">
          Get started with Flama documentation
        </h1>
        <p className="text-lg">Learn how to build, package, and deploy your modern and robust machine learning APIs.</p>
      </header>
      <main className="mx-auto mb-20 max-w-5xl space-y-16 px-4 sm:mb-32 sm:px-6 md:mb-40 md:px-8">
        <DocsDashboard />
      </main>
    </>
  )
}
