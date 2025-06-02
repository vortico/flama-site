import React from 'react'

import { Code as BaseCode, type CodeLines } from '@/components/elements'

const NON_NUMBER_LANGUAGES = ['ansi', 'text', 'txt', 'plain']
const TOKEN_LANGUAGES = ['console', 'shellsession']

export default function Code({ children, className }: React.ComponentProps<'code'>) {
  const code = React.Children.toArray(children)[0].toString().trim()
  const codeLines = code.split('\n').length
  const language = className?.match(/language-(\w+)/)?.[1]
  const lines: CodeLines | undefined =
    language === undefined || NON_NUMBER_LANGUAGES.includes(language)
      ? undefined
      : TOKEN_LANGUAGES.includes(language)
        ? { type: 'token', token: '>' }
        : { type: 'number' }

  const isInline = language === undefined && codeLines === 1

  return (
    <BaseCode
      code={code}
      language={language}
      lines={lines}
      className={`not-prose ${isInline ? 'bg-primary-200 text-sm dark:bg-primary-600' : ''}`}
    />
  )
}
