import type { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import React from 'react'

function CodeWrapper({ children }: React.ComponentProps<'code'>) {
  return <code className="relative inline flex-auto overflow-auto whitespace-normal">{children}</code>
}

export interface CodeInlineProps {
  code: string
  language: Language
}

export default function CodeInline({ code, language }: CodeInlineProps) {
  const { theme, ...props } = defaultProps

  return language ? (
    <Highlight {...props} code={code} language={language}>
      {({ tokens, getTokenProps }) => (
        <CodeWrapper>
          {tokens[0].map((token, i) => (
            <span key={`token-${i}`} {...getTokenProps({ token })} />
          ))}
        </CodeWrapper>
      )}
    </Highlight>
  ) : (
    <CodeWrapper>{code}</CodeWrapper>
  )
}
