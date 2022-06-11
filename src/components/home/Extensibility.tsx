import HomeSection from '@/components/home/HomeSection'
import { PuzzleIcon } from '@heroicons/react/outline'
import React from 'react'
import Window from '@/components/Window'
import CodeBlock from '@/components/CodeBlock'
import { Sample } from '@/lib/samples'
import FlamaName from '@/components/FlamaName'

interface ExtensibilityProps {
  samples: Sample[]
}

export default function Extensibility({ samples }: ExtensibilityProps) {
  const selectedSample = samples[0]

  return (
    <HomeSection
      id="extensibility"
      icon={<PuzzleIcon />}
      title="Extensibility"
      docRef="/docs/"
      content={
        <>
          <p>
            <FlamaName /> consists of a core of functionality for creating,
            maintaining and deploying ML-APIs. However, the ML arena is
            constantly changing, with new products for managing ML projects
            appearing very often. Being able to integrate your API with such
            third parties is of crucial importance.
          </p>
          <br />
          <p>
            <FlamaName /> is natively an extensible framework. With the ease of{' '}
            <code>Module</code> you will be able to rapidly develop your own
            plugins and keep improving flama integrability.
          </p>
        </>
      }
    >
      <div className="ml-auto -mt-16 w-full max-w-3xl">
        <Window title={selectedSample.title}>
          <div>
            <CodeBlock
              code={selectedSample.code}
              language={selectedSample.language}
              lineNumbers={selectedSample.lineNumbers}
            />
          </div>
        </Window>
      </div>
    </HomeSection>
  )
}
