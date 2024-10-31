import React, { MutableRefObject } from 'react'

import { codeToTokens, getTokenStyleObject, type BundledLanguage } from 'shiki'

import ClipboardButton from '@/components/ClipboardButton'
import { theme } from '@/lib/highlighter'

type LineType = 'number' | 'token'
export type Lines = { type: LineType; token?: string }

interface LineNumberProps {
  type: LineType
  lines?: number
  token?: string
}

function LineNumbers({ type, lines, token }: LineNumberProps) {
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

function PlainCode({
  code,
  selectedLine,
}: {
  code: string
  selectedLine?: {
    number: number
    ref?: MutableRefObject<HTMLDivElement | null>
  }
}) {
  return (
    <code>
      {code.split('\n').map((line, i) => (
        <div
          key={i}
          ref={selectedLine?.number === i + 1 ? selectedLine.ref : undefined}
          className={`line w-fit px-2 ${selectedLine?.number === i + 1 ? 'bg-brand-700' : ''}`}
        >
          {line.split(' ').map((token, j) => (
            <span key={j} className="token">
              {token}
            </span>
          ))}
        </div>
      ))}
    </code>
  )
}

async function HighlightCode({
  code,
  language,
  selectedLine,
}: {
  code: string
  language: BundledLanguage
  selectedLine?: {
    number: number
    ref?: MutableRefObject<HTMLDivElement | null>
  }
}) {
  const tokens = await codeToTokens(code, { lang: language, theme })

  return (
    <code>
      {tokens.tokens.map((line, i) => (
        <div
          key={i}
          ref={selectedLine?.number === i + 1 ? selectedLine.ref : undefined}
          className={`line w-fit px-2 ${selectedLine?.number === i + 1 ? 'bg-brand-700' : ''}`}
        >
          {line.length === 0 ? (
            <br />
          ) : (
            line.map((token, j) => (
              <span key={j} className="token" style={getTokenStyleObject(token)}>
                {token.content}
              </span>
            ))
          )}
        </div>
      ))}
    </code>
  )
}

export interface CodeBlockProps {
  code: string
  language?: BundledLanguage | string
  lines?: Lines
  copyButton?: boolean
  selectedLine?: {
    number: number
    ref?: MutableRefObject<HTMLDivElement | null>
  }
}

export default async function CodeBlock({
  code,
  language,
  lines = { type: 'number' },
  copyButton = true,
  selectedLine,
}: CodeBlockProps) {
  return (
    <div className="group relative flex h-fit w-full overflow-hidden whitespace-pre text-left text-sm leading-6">
      {lines && <LineNumbers lines={code.split('\n').length} type={lines.type} token={lines.token} />}
      <pre className="relative block flex-auto overflow-auto py-2">
        {language ? (
          <HighlightCode code={code} language={language as BundledLanguage} selectedLine={selectedLine} />
        ) : (
          <PlainCode code={code} selectedLine={selectedLine} />
        )}
      </pre>
      {copyButton && <ClipboardButton code={code} />}
    </div>
  )
}
