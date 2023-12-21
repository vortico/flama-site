import React from 'react'

import { Metadata } from 'next'

import LinkButton from '@/components/LinkButton'

interface DocsDashboardItemProps {
  title: string
  description: string
  url: string
}

function DocsDashboardItem({ title, description, url }: DocsDashboardItemProps) {
  return (
    <div className="flex max-w-xs flex-col justify-between">
      <div className="">
        <h2 className="text-center text-2xl font-semibold text-primary-800 dark:text-primary-200">{title}</h2>
        <p className="mt-4">{description}</p>
      </div>
      <div className="mt-8 h-8 max-w-3xl">
        <LinkButton href={url} text="Read more" rightIcon />
      </div>
    </div>
  )
}

function DocsDashboard() {
  return (
    <div className="grid justify-items-center gap-12 sm:grid-cols-1 lg:grid-cols-3">
      <DocsDashboardItem
        title="Quickstart"
        description="Follow this guide to develop your first API, and explore the main functionality offered by Flama. In this guide, you will learn how to create a new project, define your first endpoint, and run your API locally."
        url="/docs/getting-started/quickstart/"
      />
      <DocsDashboardItem
        title="Core"
        description="Deep dive into the core functionality of Flama. Learn how to package your models as binary files for reusability, and how to integrate them into your API. Also, customise the interaction with models through Components and Resources."
        url="/docs/machine-learning-api/packaging-models/"
      />
      <DocsDashboardItem
        title="CLI"
        description="Discover the Flama command line interface, and uncover the power of serving ML models codeless. This guide shows how to run an API locally, serve ML models with, and interact with them, without typing a single line of code."
        url="/docs/flama-cli/run/"
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
