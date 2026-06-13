'use client'

import React, { useCallback, useMemo, useState } from 'react'

import { IconPackage } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { PyTorchIcon, ScikitLearnIcon, TensorFlowIcon } from '@/components/icons'
import { FlamaName } from '@/components/names'
import { ISample } from '@/lib/samples'

import HomeSection from './HomeSection'
import SelectableIcons, { ISelectableIconItem } from './SelectableIcons'

const frameworks: ISelectableIconItem[] = [
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

export default function PackagingModels({ samples }: { samples: ISample[] }) {
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
      id="any-framework-one-format"
      icon={<IconPackage className="h-full w-full" />}
      title="Any Framework, One Format"
      docRef="/docs/predictive-ai/packaging-models/"
      selectableList={
        <SelectableIcons
          items={frameworks.map(({ id, name, icon }) => ({ id, name, icon }))}
          selected={selected}
          onSelect={onSelect}
        />
      }
      body={
        <>
          <p>
            There isn’t a single ML framework, and the models you build in scikit-learn, TensorFlow, or PyTorch should
            be just as easy to ship together. That integration is usually the unproductive, fiddly part of a data
            scientist’s day.
          </p>
          <br />
          <p>
            <FlamaName /> packages a model from any of the mainstream frameworks into a single portable format, the .flm
            file, so every model looks the same to your API no matter where it came from.
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
