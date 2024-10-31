import React from 'react'

import CodeBlock, { type Lines } from '@/components/CodeBlock'
import CodeInline from '@/components/CodeInline'
import Window from '@/components/Window'

const NON_NUMBER_LANGUAGES = ['ansi', 'text', 'txt', 'plain']
const TOKEN_LANGUAGES = ['console', 'shellsession']

export function Pre({ children }: React.ComponentProps<'pre'>) {
  return <Window>{children}</Window>
}

export function Code({ children, className }: React.ComponentProps<'code'>) {
  const code = React.Children.toArray(children)[0].toString().trim()
  const codeLines = code.split('\n').length
  const language = className?.match(/language-(\w+)/)?.[1]
  const lines: Lines | undefined =
    language === undefined || NON_NUMBER_LANGUAGES.includes(language)
      ? undefined
      : TOKEN_LANGUAGES.includes(language)
        ? { type: 'token', token: '>' }
        : { type: 'number' }

  return !language && codeLines == 1 ? (
    <span className="not-prose bg-primary-300 dark:bg-primary-600/50">
      <CodeInline code={code} language={language} />
    </span>
  ) : (
    <div className="not-prose">
      <CodeBlock code={code} language={language} lines={lines} />
    </div>
  )
}
