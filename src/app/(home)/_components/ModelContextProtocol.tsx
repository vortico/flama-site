'use client'

import React, { useCallback, useMemo, useState } from 'react'

import { IconDatabase, IconMessage2, IconPlugConnected, IconTool } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { FlamaName } from '@/components/names'
import { type ISample } from '@/lib/samples'

import HomeSection from './HomeSection'
import SelectableIcons, { ISelectableIconItem } from './SelectableIcons'

const components: ISelectableIconItem[] = [
  {
    id: 'tool',
    name: 'Tool',
    icon: <IconTool className="h-full w-full" />,
  },
  {
    id: 'resource',
    name: 'Resource',
    icon: <IconDatabase className="h-full w-full" />,
  },
  {
    id: 'prompt',
    name: 'Prompt',
    icon: <IconMessage2 className="h-full w-full" />,
  },
]

export default function ModelContextProtocol({ samples }: { samples: ISample[] }) {
  const [selected, setSelected] = useState<string>(components[0].id)

  const onSelect = useCallback(
    (id: string) => {
      setSelected(id)
    },
    [setSelected],
  )

  const selectedSample = useMemo(() => samples.find(({ id }) => id === selected), [selected, samples])

  return (
    <HomeSection
      id="model-context-protocol"
      icon={<IconPlugConnected className="h-full w-full" />}
      title="Model Context Protocol"
      docRef="/docs/generative-ai/model-context-protocol/"
      selectableList={
        <SelectableIcons
          items={components.map(({ id, name, icon }) => ({ id, name, icon }))}
          selected={selected}
          onSelect={onSelect}
        />
      }
      body={
        <>
          <p>
            Models are far more useful when they can reach into your world. <FlamaName /> ships native support for the
            Model Context Protocol (MCP), the open standard for exposing tools, resources, and prompts to AI clients.
          </p>
          <br />
          <p>
            Declare each capability with a single decorator, mount the server on your application, and <FlamaName />{' '}
            derives the JSON Schema from your type hints and serves it over a stateless protocol, with Tasks,
            Elicitation, and MCP Apps included.
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
