'use client'

import React from 'react'

import { IconRefresh } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { FlamaName } from '@/components/names'
import type { ISample } from '@/lib/samples'

import HomeSection from './HomeSection'

export default function ModelsLifecycle({ samples }: { samples: ISample[] }) {
  const selectedSample = samples[0]

  return (
    <HomeSection
      id="models-lifecycle"
      icon={<IconRefresh className="h-full w-full" />}
      title="Models Lifecycle"
      docRef="/docs/"
      body={
        <>
          <p>
            Loading ML models in a production application is a demanding and prone-to-error task, which also depends on
            the specific ML framework.
          </p>
          <br />
          <p>
            <FlamaName /> provides a clean solution to the problem via <b>Components</b>, which load models seamlessly.
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
