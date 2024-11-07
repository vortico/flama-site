'use client'

import React, { useEffect, useRef } from 'react'

import { ClipboardButton } from '@/components/elements'

import LineNumbers from './LineNumbers'
import { LINE_SELECTED_CLASS, type Lines } from './types'

interface CodeBlockProps {
  code: string
  lines?: Lines
  copyButton?: boolean
  children: React.ReactNode
  className?: string
}

export default function CodeBlock({
  lines = { type: 'number' },
  copyButton = true,
  code,
  className,
  children,
}: CodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const selectedLine = ref.current.querySelector(`.${LINE_SELECTED_CLASS}`)

      if (selectedLine) {
        ref.current.scrollTo({
          top: selectedLine.getBoundingClientRect().top - ref.current.clientHeight / 2,
          left: 0,
          behavior: 'smooth',
        })
      }
    }
  }, [ref])

  return (
    <div
      ref={ref}
      className={`group relative flex h-fit w-full overflow-hidden whitespace-pre text-left text-sm leading-6 ${
        className || ''
      }`}
    >
      {lines && <LineNumbers lines={code.split('\n').length} type={lines.type} token={lines.token} />}
      <pre className="relative block flex-auto overflow-auto py-2">{children}</pre>
      {copyButton && <ClipboardButton code={code} />}
    </div>
  )
}
