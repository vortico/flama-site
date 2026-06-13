'use client'

import React, { useMemo, useState } from 'react'

import { IconTools } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { FlamaName } from '@/components/names'

import HomeSection from './HomeSection'
import SelectableText from './SelectableText'

const samples = [
  {
    id: 'internal-server-error',
    title: 'Internal Server Error',
    content: (
      <div className="dark:opacity-80">
        <video src="/images/home/internal-server-error.webm" autoPlay muted loop playsInline width="920" />
      </div>
    ),
  },
  {
    id: 'not-found',
    title: 'Not Found',
    content: (
      <div className="dark:opacity-80">
        <video src="/images/home/not-found.webm" autoPlay muted loop playsInline width="920" />
      </div>
    ),
  },
]

export default function DevelopmentTools() {
  const [selected, setSelected] = useState<string>(samples[0].id)

  const selectedSample = useMemo(() => samples.find(({ id }) => id === selected), [selected])

  return (
    <HomeSection
      id="development-tools"
      icon={<IconTools className="h-full w-full" />}
      title="Development Tools"
      docRef="/docs/"
      body={
        <>
          <p>
            Building and debugging APIs can be slow and frustrating, especially when an error gives you nothing to go
            on. Identifying and fixing problems, from a simple typo to a misconfigured resource, eats into development
            time.
          </p>
          <br />
          <p>
            <FlamaName /> provides graphical tools that make debugging direct: trace server errors (Internal Server
            Error) or requests to resources that do not exist (Not Found) at a glance.
          </p>
        </>
      }
    >
      <div className="flex flex-col items-start justify-start gap-y-10 lg:flex-row lg:justify-center">
        <SelectableText items={samples} selected={selected} onSelect={setSelected} />
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
