'use client'

import React, { useCallback, useMemo, useState } from 'react'

import { IconRobot } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { PyTorchIcon, ScikitLearnIcon, TensorFlowIcon } from '@/components/icons'
import { FlamaName } from '@/components/names'
import { ISample } from '@/lib/samples'

import HomeSection from './HomeSection'
import SelectableList, { ISelectableItem } from './SelectableList'

const frameworks: ISelectableItem[] = [
  {
    id: 'sklearn',
    name: 'scikit-learn',
    icon: <ScikitLearnIcon fillOpacity=".8" />,
  },
  {
    id: 'tf',
    name: 'TensorFlow',
    icon: <TensorFlowIcon fillOpacity=".8" />,
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    icon: <PyTorchIcon fillOpacity=".8" />,
  },
]

export default function MachineLearningResponsive({ samples }: { samples: ISample[] }) {
  const [selected, setSelected] = useState<string>(frameworks[0].id)

  const onSelect = useCallback(
    (id: string) => {
      setSelected(id)
    },
    [setSelected],
  )

  const selectedSample = useMemo(() => samples.find(({ id }) => id === selected), [selected, samples])

  return (
    <HomeSection
      id="machine-learning-responsive"
      icon={<IconRobot className="h-full w-full" />}
      title="Machine Learning Responsive"
      docRef="/docs/"
      selectableList={
        <SelectableList
          items={frameworks.map(({ id, name, icon }) => ({ id, name, icon }))}
          selected={selected}
          onSelect={onSelect}
        />
      }
      body={
        <>
          <p>
            Let’s face it, there isn’t a single ML framework. Models developed in such different frameworks should be
            easily integrated together in a single API. However this integration presents a technical challenge,
            typically unproductive and annoying for a data scientist.
          </p>
          <br />
          <p>
            <FlamaName /> is thought from the very beginning to be compatible with the mainstream data-science
            frameworks, and it makes easy and simple the packaging of ML models to be integrated together.
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
