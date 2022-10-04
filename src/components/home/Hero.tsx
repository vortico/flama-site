import React, { useCallback, useMemo, useState } from 'react'
import { QuickSearchButton } from '@/components/QuickSearchButton'
import Window from '@/components/Window'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import CodeBlock from '@/components/CodeBlock'
import Link from '@/components/Link'
import { Sample } from '@/lib/samples'
import FlamaName from '@/components/FlamaName'

interface SamplesProps {
  samples: Sample[]
}

function Samples({ samples }: SamplesProps) {
  const [selected, setSelected] = useState<string>(samples[0].id)

  const onSelect = useCallback(
    (value: string) => () => setSelected(value),
    [setSelected]
  )

  const selectedSample = useMemo(
    () => samples.find(({ id }) => id === selected),
    [samples, selected]
  )

  return (
    <div className="flex flex-col items-center justify-start gap-y-10 lg:flex-row lg:justify-center">
      <div className="flex h-12 w-full basis-full justify-around lg:block lg:h-full lg:basis-1/3 lg:space-y-6 lg:pl-9">
        {samples.map(({ id, title }) => (
          <button key={id} className="flex items-center" onClick={onSelect(id)}>
            {selected === id && (
              <ChevronRightIcon className="-ml-8 inline h-8 text-brand-500 sm:-ml-9 sm:h-9" />
            )}
            <span
              className={`text-lg font-bold tracking-tight sm:text-3xl ${
                selected === id
                  ? 'text-primary-700 underline decoration-brand-500 decoration-4 underline-offset-8 dark:text-primary-200'
                  : 'text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200'
              }`}
            >
              {title}
            </span>
          </button>
        ))}
      </div>
      <div className="h-full min-h-[17.5rem] w-full basis-full lg:basis-2/3">
        {selectedSample && (
          <Window title={selectedSample.title}>
            <div className="max-h-64">
              <CodeBlock
                code={selectedSample.code}
                language={selectedSample.language}
                lineNumbers={selectedSample.lineNumbers}
              />
            </div>
          </Window>
        )}
      </div>
    </div>
  )
}

export interface HeroProps {
  samples: Sample[]
}

export default function Hero({ samples }: HeroProps) {
  return (
    <>
      <section className="mx-auto max-w-5xl px-8 pt-20 text-center sm:pt-24 lg:pt-32">
        <h1 className="text-4xl font-extrabold text-primary-700 dark:text-primary-200 sm:text-5xl lg:text-6xl">
          Productionalize your machine learning models seamlessly
        </h1>
        <p className="mx-auto mt-10 max-w-3xl text-lg">
          <FlamaName /> is a data-science oriented framework to rapidly build
          modern and robust machine learning APIs. With <FlamaName />{' '}
          application you will be able to deploy models in seconds.
          <br />
          Fire up your models with the flame 🔥
        </p>
        <div className="mt-10 flex justify-center gap-6 text-sm">
          <div className="h-12 w-auto">
            <Link
              href="/docs"
              className="inline-flex h-full items-center rounded-full bg-brand-500 px-10 text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600 dark:bg-brand-600 dark:text-primary-100 dark:hover:bg-brand-500 dark:focus:ring-brand-300"
            >
              <span className="text-left text-lg font-semibold">
                Get Started
              </span>
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
