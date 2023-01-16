import FlamaName from '@/components/FlamaName'
import HomeSection from '@/components/home/HomeSection'
import Window from '@/components/Window'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useCallback, useMemo, useState } from 'react'

const samples = [
  {
    id: 'internal-server-error',
    title: 'Internal Server Error',
    content: (
      <div className="dark:opacity-70">
        <Image
          src="/images/home/internal-server-error.png"
          alt="internal-server-error-page"
          width="1600"
          height="920"
        />
      </div>
    ),
  },
  {
    id: 'not-found',
    title: 'Not Found',
    content: (
      <div className="dark:opacity-70">
        <Image src="/images/home/not-found.png" alt="not-found-page" width="1600" height="920" />
      </div>
    ),
  },
]

export default function DevelopmentTools() {
  const [selected, setSelected] = useState<string>(samples[0].id)

  const onSelect = useCallback((value: string) => () => setSelected(value), [setSelected])

  const selectedSample = useMemo(() => samples.find(({ id }) => id === selected), [selected])

  return (
    <HomeSection
      id="development-tools"
      icon={<WrenchScrewdriverIcon />}
      title="Development Tools"
      docRef="/docs/"
      content={
        <>
          <p>
            The process of developing APIs for Machine Learning can be complex and time-consuming, especially when it
            comes to debugging. Debugging refers to the process of identifying and fixing errors in the code, which can
            range from simple syntax errors to more complex issues such as incorrect data access or resource management.
          </p>
          <br />
          <p>
            <FlamaName /> provides graphical tools that make debugging simple and direct, allowing you to trace code
            errors (Internal Server Error), or access to non-existent resources (Not Found) with ease.
          </p>
        </>
      }
    >
      <div className="flex flex-col items-center justify-start gap-y-10 lg:flex-row lg:justify-center">
        <div className="h-full w-full basis-full space-y-6 pl-9 lg:basis-1/3">
          {samples.map(({ id, title }) => (
            <button key={id} className="flex items-center" onClick={onSelect(id)}>
              {selected === id && <ChevronRightIcon className="-ml-7 inline h-7 text-brand-500" />}
              <span
                className={`text-lg font-bold tracking-tight sm:text-xl ${
                  selected === id
                    ? 'text-primary-700 underline decoration-brand-500 decoration-2 underline-offset-8 dark:text-primary-200'
                    : 'text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200'
                }`}
              >
                {title}
              </span>
            </button>
          ))}
        </div>
        <motion.div
          initial={{ y: '250px' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="h-full w-full basis-full lg:-mt-16 lg:basis-2/3 lg:self-start"
        >
          <Window title={selectedSample && selectedSample.title}>{selectedSample && selectedSample.content}</Window>
        </motion.div>
      </div>
    </HomeSection>
  )
}
