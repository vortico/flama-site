import CodeWindow from '@/components/CodeWindow'
import HomeSection from '@/components/home/HomeSection'
import { FlamaName } from '@/components/names'
import { Sample } from '@/lib/samples'
import { IconPlug } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React from 'react'

interface ExtensibilityProps {
  samples: Sample[]
}

export default function Extensibility({ samples }: ExtensibilityProps) {
  const selectedSample = samples[0]

  return (
    <HomeSection
      id="extensibility"
      icon={<IconPlug className="h-full w-full" />}
      title="Extensibility"
      docRef="/docs/"
      body={
        <>
          <p>
            <FlamaName /> consists of a core of functionality for creating, maintaining and deploying ML-APIs. However,
            the ML arena is constantly changing, with new products for managing ML projects appearing very often. Being
            able to integrate your API with such third parties is of crucial importance.
          </p>
          <br />
          <p>
            <FlamaName /> is natively an extensible framework. With the ease of <code>Module</code> you will be able to
            rapidly develop your own plugins and keep improving <FlamaName /> integrability.
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
        <CodeWindow
          title={selectedSample.title}
          code={selectedSample.code}
          language={selectedSample.language}
          lineNumbers={selectedSample.lineNumbers}
        />
      </motion.div>
    </HomeSection>
  )
}
