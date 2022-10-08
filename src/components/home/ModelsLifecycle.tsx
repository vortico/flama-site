import HomeSection from '@/components/home/HomeSection'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Sample } from '@/lib/samples'
import FlamaName from '@/components/FlamaName'
import CodeWindow from '@/components/CodeWindow'

interface ModelsLifecycleProps {
  samples: Sample[]
}

export default function ModelsLifecycle({ samples }: ModelsLifecycleProps) {
  const selectedSample = samples[0]

  return (
    <HomeSection
      id="models-lifecycle"
      icon={<ArrowPathIcon />}
      title="Models Lifecycle"
      docRef="/docs/"
      content={
        <>
          <p>
            Loading ML models in a production application is a demanding and
            prone-to-error task, which also depends on the specific ML
            framework.
          </p>
          <br />
          <p>
            <FlamaName /> provides a clean solution to the problem via{' '}
            <b>Components</b>, which load models seamlessly.
          </p>
        </>
      }
    >
      <div className="ml-auto -mt-16 w-full max-w-3xl">
        <CodeWindow
          title={selectedSample.title}
          code={selectedSample.code}
          language={selectedSample.language}
          lineNumbers={selectedSample.lineNumbers}
        />
      </div>
    </HomeSection>
  )
}
