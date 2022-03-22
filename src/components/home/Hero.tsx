import React, { useCallback, useState } from 'react'
import { QuickSearchButton } from '@/components/QuickSearchButton'
import LinkButton from '@/components/LinkButton'
import Window from '@/components/Window'
import { ChevronRightIcon } from '@heroicons/react/solid'
import CodeBlock, { CodeBlockProps } from '@/components/CodeBlock'

export interface Sample {
  title: string
  code: CodeBlockProps
}

interface SamplesProps {
  samples: Sample[]
}

function Samples({ samples }: SamplesProps) {
  const [selected, setSelected] = useState<number>(0)

  const onSelect = useCallback(
    (value) => () => setSelected(value),
    [setSelected]
  )

  return (
    <div className="flex flex-col items-center justify-start gap-y-10 lg:flex-row lg:justify-center">
      <div className="flex h-12 w-full basis-full justify-around lg:block lg:h-full lg:basis-1/3 lg:space-y-6 lg:pl-9">
        {samples.map(({ title }, i) => (
          <button key={i} className="flex items-center" onClick={onSelect(i)}>
            {selected === i && (
              <ChevronRightIcon className="-ml-8 inline h-8 text-brand-500 sm:-ml-9 sm:h-9" />
            )}
            <span
              className={`text-lg font-bold tracking-tight sm:text-3xl ${
                selected === i
                  ? 'text-primary-600 underline decoration-brand-500 decoration-4 underline-offset-8 dark:text-primary-300'
                  : 'text-primary-500'
              }`}
            >
              {title}
            </span>
          </button>
        ))}
      </div>
      <div className="h-full min-h-[17.5rem] w-full basis-full lg:basis-2/3">
        <Window title={samples[selected].title}>
          <CodeBlock {...samples[selected].code} />
        </Window>
      </div>
    </div>
  )
}

export interface HeroProps {
  samples: Sample[]
}

export function Hero({ samples }: HeroProps) {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-20 text-center sm:pt-24 md:px-8 lg:pt-32">
        <h1 className="text-4xl font-extrabold text-primary-700 dark:text-primary-200 sm:text-5xl lg:text-6xl">
          Productionalize your machine learning models seamlessly
        </h1>
        <p className="mx-auto mt-10 max-w-3xl text-lg">
          <span className="text-brand-500">Flama</span> is a data-science
          oriented framework to rapidly build modern and robust machine learning
          APIs. With <span className="text-brand-500">flama</span> application
          you will be able to deploy models in seconds.
          <br />
          Fire up your team with the flame 🔥
        </p>
        <div className="mt-10 flex justify-center gap-6 text-sm">
          <div className="h-12 w-auto">
            <LinkButton text="Get Started" href="/docs" className="px-10" />
          </div>
          <div className="hidden h-12 w-72 sm:flex">
            <QuickSearchButton />
          </div>
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-6xl sm:mt-24 lg:mt-32">
        <Samples samples={samples} />
      </section>
    </>
  )
}
