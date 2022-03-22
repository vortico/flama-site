import React from 'react'
import Window from '@/components/Window'
import type { Language } from 'prism-react-renderer'
import CodeBlock from '@/components/CodeBlock'
import CodeInline from '@/components/CodeInline'

export function Pre({ children }: React.ComponentProps<'pre'>) {
  return <Window className="not-prose">{children}</Window>
}

export function Code({ children, className }: React.ComponentProps<'code'>) {
  const code = React.Children.toArray(children)[0].toString().trim()
  const lines = code.split('\n').length
  const language = className?.match(/language-(\w+)/)?.[1] as Language

  return lines === 1 ? (
    <span className="not-prose">
      <CodeInline code={code} language={language} />
    </span>
  ) : (
    <CodeBlock code={code} language={language} />
  )
}
