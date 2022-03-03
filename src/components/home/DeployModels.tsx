import { HomeSection } from '@/components/home/HomeSection'
import { ChipIcon } from '@heroicons/react/outline'
import React, { ReactNode, useCallback, useState } from 'react'
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

interface IFrameworkItem extends ISelectableItem {
  content: ReactNode
}

const frameworks: IFrameworkItem[] = [
  {
    id: 'tf',
    name: 'TensorFlow',
    icon: (
      <TensorFlowIcon
        fill="currentColor"
        fillOpacity=".8"
        stroke="currentColor"
        strokeWidth="2"
      />
    ),
    content: <div />,
  },
  {
    id: 'sklearn',
    name: 'scikit-learn',
    icon: (
      <ScikitLearnIcon
        fill="currentColor"
        fillOpacity=".8"
        stroke="currentColor"
        strokeWidth="2"
      />
    ),

    content: <div />,
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    icon: (
      <PyTorchIcon
        fill="currentColor"
        fillOpacity=".8"
        stroke="currentColor"
        strokeWidth="2"
      />
    ),
    content: <div />,
  },
  {
    id: 'pycaret',
    name: 'PyCaret',
    icon: (
      <PyCaretIcon
        fill="currentColor"
        fillOpacity=".8"
        stroke="currentColor"
        strokeWidth="2"
      />
    ),
    content: <div />,
  },
]

export function DeployModels() {
  const [selected, setSelected] = useState<string>(frameworks[0].id)

  const onSelect = useCallback(
    (id) => {
      setSelected(id)
    },
    [setSelected]
  )

  return (
    <HomeSection
      id="deploy-models"
      icon={<ChipIcon />}
      title="Deploy Any Model"
      docRef="/docs/"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut
        ultrices diam, id lobortis justo. Maecenas in pharetra dolor. Nunc vitae
        arcu in est euismod feugiat. Vestibulum lacus libero, posuere sed
        porttitor vel, lobortis vitae ex. Sed nisl justo, congue vestibulum enim
        finibus, convallis maximus risus."
    >
      <SelectableList
        items={frameworks.map(({ id, name, icon }) => ({ id, name, icon }))}
        selected={selected}
        onSelect={onSelect}
      />
    </HomeSection>
  )
}
