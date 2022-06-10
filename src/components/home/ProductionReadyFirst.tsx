import HomeSection from '@/components/home/HomeSection'
import { SparklesIcon } from '@heroicons/react/outline'
import React, { useCallback, useMemo, useState } from 'react'
import Window from '@/components/Window'
import CodeBlock from '@/components/CodeBlock'
import {
  ISelectableItem,
  SelectableList,
} from '@/components/home/SelectableList'
import { Sample } from '@/lib/samples'
import { DockerIcon } from '@/components/icons'
import { TerminalIcon } from '@heroicons/react/solid'

const items: ISelectableItem[] = [
  {
    id: 'cli',
    name: 'Command Line',
    icon: <TerminalIcon fillOpacity=".8" />,
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: <DockerIcon fillOpacity=".8" />,
  },
]

interface ProductionReadyFirstProps {
  samples: Sample[]
}

export default function ProductionReadyFirst({
  samples,
}: ProductionReadyFirstProps) {
  const [selected, setSelected] = useState<string>(items[0].id)

  const onSelect = useCallback(
    (id: string) => {
      setSelected(id)
    },
    [setSelected]
  )

  const selectedSample = useMemo(
    () => samples.find(({ id }) => id === selected),
    [selected, samples]
  )

  return (
    <HomeSection
      id="production-ready-first"
      icon={<SparklesIcon />}
      title="Production-Ready First"
      docRef="/docs/"
      selectableList={
        <SelectableList
          items={items.map(({ id, name, icon }) => ({ id, name, icon }))}
          selected={selected}
          onSelect={onSelect}
        />
      }
      content={
        <p>
          Need your models serving ASAP? It does not feel right to have to wait
          months to see if your models work outside a Jupyter notebook, doesn’t
          it? Flama API has been thought from the beginning to deploy ML models
          into production as straightforwardly as possible.
        </p>
      }
    >
      <div className="ml-auto -mt-16 w-full max-w-3xl">
        {selectedSample && (
          <Window title={selectedSample.title}>
            <div className="max-h-64">
              <CodeBlock
                code={selectedSample.code}
                language={selectedSample.language}
                lineNumbers={selectedSample.lineNumbers}
              />
            </div>
          </Window>
        )}
      </div>
    </HomeSection>
  )
}
