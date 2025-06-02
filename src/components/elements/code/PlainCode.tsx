import React from 'react'

import { LINE_SELECTED_CLASS } from './types'

export default function PlainCode({ code, selectedLine }: { code: string; selectedLine?: number }) {
  const lines = code.split('\n')

  const isInline = lines.length === 1

  return (
    <code>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`line ${isInline ? 'inline-block h-full w-fit px-1' : 'block w-fit px-2'} ${
            selectedLine === i + 1 ? `${LINE_SELECTED_CLASS} bg-brand-700` : ''
          }`}
        >
          {line.length === 0 ? (
            <br />
          ) : (
            line.split(' ').map((token, j) => (
              <span key={j} className="token">
                {`${j === 0 ? '' : ' '}${token}`}
              </span>
            ))
          )}
        </span>
      ))}
    </code>
  )
}
