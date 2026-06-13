'use client'

import React, { useCallback, useMemo, useState } from 'react'

import { IconDownload, IconRobot, IconSparkles } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { FlamaName } from '@/components/names'
import { ISample } from '@/lib/samples'

import HomeSection from './HomeSection'
import SelectableIcons, { ISelectableIconItem } from './SelectableIcons'

const families: ISelectableIconItem[] = [
  {
    id: 'ml',
    name: 'Predictive',
    icon: <IconRobot className="h-full w-full" />,
  },
  {
    id: 'llm',
    name: 'Generative',
    icon: <IconSparkles className="h-full w-full" />,
  },
]

export default function ModelsOnDemand({ samples }: { samples: ISample[] }) {
  const [selected, setSelected] = useState<string>(families[0].id)

  const onSelect = useCallback(
    (id: string) => {
      setSelected(id)
    },
    [setSelected],
  )

  const selectedSample = useMemo(() => samples.find(({ id }) => id === selected), [selected, samples])

  return (
    <HomeSection
      id="models-on-demand"
      icon={<IconDownload className="h-full w-full" />}
      title="Models on Demand"
      docRef="/docs/flama-cli/get/"
      selectableList={
        <SelectableIcons
          items={families.map(({ id, name, icon }) => ({ id, name, icon }))}
          selected={selected}
          onSelect={onSelect}
        />
      }
      body={
        <>
          <p>
            Not every model lives on your disk. Whether you need a predictive model or a generative one, the right one
            is often a single download away on a hub such as HuggingFace.
          </p>
          <br />
          <p>
            With a single command, <FlamaName /> downloads a model from the hub and serialises it straight into the
            portable .flm format, ready to serve. No glue code, no manual conversion, no boilerplate.
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
        {selectedSample && <Window title={selectedSample.title}>{selectedSample.code}</Window>}
      </motion.div>
    </HomeSection>
  )
}
