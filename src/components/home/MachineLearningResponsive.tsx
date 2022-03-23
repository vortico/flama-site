import HomeSection from '@/components/home/HomeSection'
import { ChipIcon } from '@heroicons/react/outline'
import React, { useCallback, useMemo, useState } from 'react'
import Window from '@/components/Window'
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
import { Sample } from '@/lib/samples'

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

interface MachineLearningResponsiveProps {
  samples: Sample[]
}

export default function MachineLearningResponsive({
  samples,
}: MachineLearningResponsiveProps) {
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
      id="machine-learning-responsive"
      icon={<ChipIcon />}
      title="Machine Learning Responsive"
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
            Spending time in adapting (by copy-pasting and tinkering) existing
            code to the particularities of the library in which the model was
            built to take your ML model into production is unproductive and
            annoying, seriously!
          </p>
          <br />
          <p>
            Flama resources make it possible to easily integrate models built in
            any of the mainstream data-science libraries, making your ML-API
            easily adapt to any ML framework.
          </p>
        </>
      }
    >
      <div className="ml-auto -mt-16 w-full max-w-3xl">
        {selectedSample && (
          <Window title={selectedSample.title}>
            <CodeBlock
              code={selectedSample.code}
              language={selectedSample.language}
              lineNumbers={selectedSample.lineNumbers}
            />
          </Window>
        )}
      </div>
    </HomeSection>
  )
}
