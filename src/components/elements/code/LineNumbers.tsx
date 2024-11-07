import React from 'react'

import type { LineType } from './types'

interface LineNumberProps {
  type: LineType
  lines?: number
  token?: string
}

export default function LineNumbers({ type, lines, token }: LineNumberProps) {
  return (
    <div className="hidden flex-none select-none p-2 text-right font-mono text-primary-500 md:block" aria-hidden="true">
      {Array.from(Array(lines).keys()).map((line) => (
        <div key={`line-number-${line + 1}`} className="line-number">
          {type === 'token' ? token : line + 1}
        </div>
      ))}
    </div>
  )
}
