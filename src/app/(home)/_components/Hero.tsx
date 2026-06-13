'use client'

import React, { useMemo, useState } from 'react'

import { Link, QuickSearchButton, Window } from '@/components/elements'
import { FlamaName } from '@/components/names'
import { ISample } from '@/lib/samples'

import SelectableText from './SelectableText'

function Samples({ samples }: { samples: ISample[] }) {
  const [selected, setSelected] = useState<string>(samples[0].id)

  const selectedSample = useMemo(() => samples.find(({ id }) => id === selected), [samples, selected])

  return (
    <div className="flex flex-col items-start justify-start gap-y-10 lg:flex-row lg:justify-center">
      <SelectableText
        items={samples}
        selected={selected}
        onSelect={setSelected}
        size="lg"
        className="flex h-12 w-full basis-full justify-around lg:block lg:h-full lg:basis-1/3 lg:space-y-6 lg:pl-9"
      />
      <div className="h-full min-h-[17.5rem] w-full basis-full lg:basis-2/3">
        {selectedSample && <Window title={selectedSample.title}>{selectedSample.code}</Window>}
      </div>
    </div>
  )
}

export default function Hero({ samples }: { samples: ISample[] }) {
  return (
    <>
      <section className="mx-auto max-w-5xl px-8 pt-20 text-center sm:pt-24 lg:pt-32">
        <h1 className="text-4xl font-extrabold text-primary-700 dark:text-primary-200 sm:text-5xl lg:text-6xl">
          The production framework for Predictive and Generative AI
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-lg">
          Turn any model into a production API in a single line of code. Serve predictive and generative models on a
          Rust-powered core, and expose your tools to AI agents over the Model Context Protocol (MCP).
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-base text-primary-500 dark:text-primary-400">
          <FlamaName /> is the Framework for Lightweight Applications, artificial intelligence Models, and Automation.
        </p>
        <p className="mt-4 font-mono text-sm font-semibold text-brand-500 sm:text-base">Light up your models 🔥</p>
        <div className="mt-10 flex justify-center gap-6 text-sm">
          <div className="h-12 w-auto">
            <Link
              href="/docs/"
              className="inline-flex h-full items-center rounded-full bg-brand-500 px-10 text-white transition-all duration-200 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 dark:focus:ring-brand-400"
            >
              <span className="text-left text-lg font-semibold">Get Started</span>
            </Link>
          </div>
          <div className="hidden h-12 w-72 sm:flex">
            <QuickSearchButton />
          </div>
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-8 sm:mt-24 lg:mt-32">
        <Samples samples={samples} />
      </section>
    </>
  )
}
