import HomeSection from '@/components/home/HomeSection'
import { LightningBoltIcon } from '@heroicons/react/outline'
import React, { useCallback, useMemo, useState } from 'react'
import Window from '@/components/Window'
import { Sample } from '@/lib/samples'
import {
  ISelectableItem,
  SelectableList,
} from '@/components/home/SelectableList'
import {
  PyCaretIcon,
  PyTorchIcon,
  ScikitLearnIcon,
  TensorFlowIcon,
} from '@/components/icons'
import CodeBlock from '@/components/CodeBlock'

const frameworks: ISelectableItem[] = [
  {
    id: 'tf',
    name: 'TensorFlow',
    icon: <TensorFlowIcon fillOpacity=".8" />,
  },
  {
    id: 'sklearn',
    name: 'scikit-learn',
    icon: <ScikitLearnIcon fillOpacity=".8" />,
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    icon: <PyTorchIcon fillOpacity=".8" />,
  },
  {
    id: 'pycaret',
    name: 'PyCaret',
    icon: <PyCaretIcon fillOpacity=".8" />,
  },
]

interface EffortlessProps {
  samples: Sample[]
}

export default function Effortless({ samples }: EffortlessProps) {
  const [selected, setSelected] = useState<string>(frameworks[0].id)

  const onSelect = useCallback(
    (id) => {
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
      id="effortless"
      icon={<LightningBoltIcon />}
      title="Effortless"
      docRef="/docs/"
      selectableList={
        <SelectableList
          items={frameworks.map(({ id, name, icon }) => ({ id, name, icon }))}
          selected={selected}
          onSelect={onSelect}
        />
      }
      content={
        <>
          <p>
            Flama application allows your team to fully focus of the
            machine-learning tasks, reducing the overhead of having to program
            an API to expose their models.
          </p>
          <br />
          <p>
            With the ease of a single command line your serialized models will
            be ready to serve via HTTP requests in seconds. Flama transforms any
            model into a ML-API ready to serve its purpose.
          </p>
        </>
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
