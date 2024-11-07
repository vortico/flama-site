'use client'

import React, { useCallback, useMemo, useState } from 'react'

import { IconSparkles, IconTerminal2 } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { DockerIcon, PythonIcon } from '@/components/icons'
import { FlamaName } from '@/components/names'
import { type ISample } from '@/lib/samples'

import HomeSection from './HomeSection'
import SelectableList, { ISelectableItem } from './SelectableList'

const items: ISelectableItem[] = [
  {
    id: 'cli',
    name: 'Command Line',
    icon: <IconTerminal2 className="h-full w-full" fillOpacity=".8" />,
  },
  {
    id: 'python',
    name: 'Python',
    icon: <PythonIcon fillOpacity=".8" />,
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: <DockerIcon fillOpacity=".8" />,
  },
]

export default function ProductionReadyFirst({ samples }: { samples: ISample[] }) {
  const [selected, setSelected] = useState<string>(items[0].id)

  const onSelect = useCallback(
    (id: string) => {
      setSelected(id)
    },
    [setSelected],
  )

  const selectedSample = useMemo(() => samples.find(({ id }) => id === selected), [selected, samples])

  return (
    <HomeSection
      id="production-ready-first"
      icon={<IconSparkles className="h-full w-full" />}
      title="Production-Ready First"
      docRef="/docs/"
      selectableList={
        <SelectableList
          items={items.map(({ id, name, icon }) => ({ id, name, icon }))}
          selected={selected}
          onSelect={onSelect}
        />
      }
      body={
        <>
          <p>
            Need your models serving ASAP? It does not feel right to have to wait months to see if your models work
            outside a Jupyter notebook, does it?{' '}
          </p>
          <br />
          <p>
            <FlamaName /> makes the deployment of ML models into production as straightforwardly as possible. With the
            ease of a single command line your packaged models will be ready to serve via HTTP requests in seconds.{' '}
            <FlamaName /> transforms any model into an ML-API ready to serve its purpose.
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
