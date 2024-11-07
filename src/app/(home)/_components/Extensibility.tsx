'use client'

import React from 'react'

import { IconPlug } from '@tabler/icons-react'
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
      icon={<IconPlug className="h-full w-full" />}
      title="Extensibility"
      docRef="/docs/"
      body={
        <>
          <p>
            <FlamaName /> consists of a core of functionality for creating, maintaining and deploying ML-APIs. However,
            the ML arena is constantly changing, with new products for managing ML projects appearing very often. Being
            able to integrate your API with such third parties is of crucial importance.
          </p>
          <br />
          <p>
            <FlamaName /> is natively an extensible framework. With the ease of <code>Module</code> you will be able to
            rapidly develop your own plugins and keep improving <FlamaName /> integrability.
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
