import React from 'react'
import Window from '@/components/Window'
import type { Language } from 'prism-react-renderer'
import CodeBlock from '@/components/CodeBlock'
import CodeInline from '@/components/CodeInline'

export function Pre({ children }: React.ComponentProps<'pre'>) {
  return <Window>{children}</Window>
}

export function Code({ children, className }: React.ComponentProps<'code'>) {
  const code = React.Children.toArray(children)[0].toString().trim()
  const lines = code.split('\n').length
  const language = className?.match(/language-(\w+)/)?.[1]

  return !language && lines == 1 ? (
    <span className="not-prose bg-primary-300 dark:bg-primary-600/50">
      <CodeInline code={code} language={language as Language} />
    </span>
  ) : (
    <div className="not-prose">
      <CodeBlock code={code} language={language as Language} lineNumbers={language !== 'commandline'} />
    </div>
  )
}
