'use client'

import React, { ReactNode } from 'react'

import { IconCpu, IconFileZip, IconJson, IconPackages, IconRouteSquare2 } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { FlamaName } from '@/components/names'

import HomeSection from './HomeSection'

interface IHotPath {
  id: string
  title: string
  description: string
  icon: ReactNode
}

const hotPaths: IHotPath[] = [
  {
    id: 'routing',
    title: 'Routing',
    description: 'Path matching and route resolving compiled to native code.',
    icon: <IconRouteSquare2 className="h-full w-full" />,
  },
  {
    id: 'json',
    title: 'JSON encoding',
    description: 'Request and response serialisation handled by the Rust crate.',
    icon: <IconJson className="h-full w-full" />,
  },
  {
    id: 'parsing',
    title: 'Request parsing',
    description: 'Multipart and URL-encoded form parsing, the fast way.',
    icon: <IconPackages className="h-full w-full" />,
  },
  {
    id: 'compression',
    title: 'Compression',
    description: 'Stream-based gzip, brotli, bzip2, lzma, and zstd codecs.',
    icon: <IconFileZip className="h-full w-full" />,
  },
]

export default function RustCore() {
  return (
    <HomeSection
      id="rust-core"
      icon={<IconCpu className="h-full w-full" />}
      title="A Rust-Powered Core"
      docRef="/docs/"
      body={
        <>
          <p>
            <FlamaName /> moves its performance-critical paths into a compiled Rust core, built with PyO3 and shipped as
            native wheels for every supported Python version.
          </p>
          <br />
          <p>
            You get the speed-ups with a plain <code>pip install</code> (no Rust toolchain required), while the same
            ergonomic Python API you already know stays exactly the same.
          </p>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {hotPaths.map(({ id, title, description, icon }, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-brand-500/30 bg-gradient-to-b from-brand-500/10 p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/90 p-2.5 text-primary-100 dark:text-primary-800">
              {icon}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-primary-700 dark:text-primary-200">{title}</h3>
            <p className="mt-2 text-sm">{description}</p>
          </motion.div>
        ))}
      </div>
    </HomeSection>
  )
}
