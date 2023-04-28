import CodeWindow from '@/components/CodeWindow'
import HomeSection from '@/components/home/HomeSection'
import { ISelectableItem, SelectableList } from '@/components/home/SelectableList'
import { PythonIcon } from '@/components/icons'
import { FlamaName } from '@/components/names'
import { Sample } from '@/lib/samples'
import { IconSparkles, IconTerminal2 } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React, { useCallback, useMemo, useState } from 'react'

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
  // {
  //   id: 'docker',
  //   name: 'Docker',
  //   icon: <DockerIcon fillOpacity=".8" />,
  // },
]

interface ProductionReadyFirstProps {
  samples: Sample[]
}

export default function ProductionReadyFirst({ samples }: ProductionReadyFirstProps) {
  const [selected, setSelected] = useState<string>(items[0].id)

  const onSelect = useCallback(
    (id: string) => {
      setSelected(id)
    },
    [setSelected]
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
      content={
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
        className="ml-auto -mt-16 w-full max-w-3xl"
      >
        {selectedSample && (
          <CodeWindow
            title={selectedSample.title}
            code={selectedSample.code}
            language={selectedSample.language}
            lineNumbers={selectedSample.lineNumbers}
            className="max-h-64"
          />
        )}
      </motion.div>
    </HomeSection>
  )
}
