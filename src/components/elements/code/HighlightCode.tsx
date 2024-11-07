import React from 'react'

import getHighlighter, { theme, tokenStyle } from '@/lib/highlighter'

import { LINE_SELECTED_CLASS } from './types'

export default async function HighlightCode({
  code,
  language,
  selectedLine,
}: {
  code: string
  language: string
  selectedLine?: number
}) {
  const tokens = (await getHighlighter()).codeToTokens(code, { lang: language, theme })
  // const tokens = {tokens: code.split('\n').map((line) => line.split(' ').map((token) => ({content: token})))}

  const isInline = tokens?.tokens.length === 1

  return (
    <code>
      {tokens?.tokens.map((line, i) => (
        <span
          key={i}
          className={`line ${isInline ? 'inline' : 'block w-fit px-2'} ${
            selectedLine === i + 1 ? `${LINE_SELECTED_CLASS} bg-brand-700` : ''
          }`}
        >
          {line.length === 0 ? (
            <br />
          ) : (
            line.map((token, j) => (
              <span key={j} className="token" style={tokenStyle(token)}>
                {token.content}
              </span>
            ))
          )}
        </span>
      ))}
    </code>
  )
}
