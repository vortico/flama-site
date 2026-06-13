'use client'

import React from 'react'

import { IconPuzzle } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { FlamaName } from '@/components/names'
import { type ISample } from '@/lib/samples'

import HomeSection from './HomeSection'

export default function Extensibility({ samples }: { samples: ISample[] }) {
  const selectedSample = samples[0]

  return (
    <HomeSection
      id="extensibility"
      icon={<IconPuzzle className="h-full w-full" />}
      title="Extensibility"
      docRef="/docs/"
      body={
        <>
          <p>
            <FlamaName /> ships a focused core for building, maintaining, and deploying model APIs, but the ecosystem
            around models moves fast and new tools appear all the time. Being able to plug those into your API matters.
          </p>
          <br />
          <p>
            <FlamaName /> is extensible by design. With a simple <code>Module</code> you can build your own plugins and
            grow what <FlamaName /> integrates with, without touching the core.
          </p>
        </>
      }
    >
      <motion.div
        initial={{ y: '250px' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        className="-mt-16 ml-auto w-full max-w-3xl"
      >
        <Window title={selectedSample.title}>{selectedSample.code}</Window>
      </motion.div>
    </HomeSection>
  )
}
