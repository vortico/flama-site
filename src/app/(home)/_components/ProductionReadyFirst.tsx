'use client'

import React, { useCallback, useMemo, useState } from 'react'

import { IconFileCode, IconRocket, IconTerminal2 } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { DockerIcon, PythonIcon } from '@/components/icons'
import { FlamaName } from '@/components/names'
import { type ISample } from '@/lib/samples'

import HomeSection from './HomeSection'
import SelectableIcons, { ISelectableIconItem } from './SelectableIcons'

const items: ISelectableIconItem[] = [
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
    id: 'spec',
    name: 'Spec file',
    icon: <IconFileCode className="h-full w-full" fillOpacity=".8" />,
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
      icon={<IconRocket className="h-full w-full" />}
      title="Production-Ready First"
      docRef="/docs/"
      selectableList={
        <SelectableIcons
          items={items.map(({ id, name, icon }) => ({ id, name, icon }))}
          selected={selected}
          onSelect={onSelect}
        />
      }
      body={
        <>
          <p>
            Going from a packaged model to a running service should take minutes, not months. <FlamaName /> makes that
            the default, whether you are serving a predictive model or a generative one.
          </p>
          <br />
          <p>
            Point it at a packaged model from the command line, in Python, with a specification file, or inside a
            container, and it is ready to serve over HTTP in seconds.
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
