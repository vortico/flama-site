'use client'

import React, { useCallback, useMemo, useState } from 'react'

import { IconBrandOpenai, IconSparkles } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { Window } from '@/components/elements'
import { AnthropicIcon, FlamaIcon, OllamaIcon } from '@/components/icons'
import { FlamaName } from '@/components/names'
import { ISample } from '@/lib/samples'

import HomeSection from './HomeSection'
import SelectableIcons, { ISelectableIconItem } from './SelectableIcons'

const dialects: ISelectableIconItem[] = [
  {
    id: 'native',
    name: 'Native',
    icon: <FlamaIcon className="h-full w-full" />,
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: <IconBrandOpenai className="h-full w-full" />,
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    icon: <AnthropicIcon className="h-full w-full" />,
  },
  {
    id: 'ollama',
    name: 'Ollama',
    icon: <OllamaIcon className="h-full w-full" />,
  },
]

export default function GenerativeAIServing({ samples }: { samples: ISample[] }) {
  const [selected, setSelected] = useState<string>(dialects[0].id)

  const onSelect = useCallback(
    (id: string) => {
      setSelected(id)
    },
    [setSelected],
  )

  const selectedSample = useMemo(() => samples.find(({ id }) => id === selected), [selected, samples])

  return (
    <HomeSection
      id="generative-ai-serving"
      icon={<IconSparkles className="h-full w-full" />}
      title="Generative AI Serving"
      docRef="/docs/generative-ai/overview/"
      selectableList={
        <SelectableIcons
          items={dialects.map(({ id, name, icon }) => ({ id, name, icon }))}
          selected={selected}
          onSelect={onSelect}
        />
      }
      body={
        <>
          <p>
            Serving a generative model should be as simple as serving any other model. With <FlamaName />, it is.
            Package a model, point the CLI at it, and you have a production-ready generative API in seconds.
          </p>
          <br />
          <p>
            Pick the dialects your clients already speak (OpenAI, Anthropic, Ollama, and the channel-aware native
            protocol) and <FlamaName /> exposes them side by side.
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
