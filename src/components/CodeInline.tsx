import Highlight, { defaultProps } from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'

export interface CodeInlineProps {
  code: string
  language: Language
}

export default function CodeInline({ code, language }: CodeInlineProps) {
  const { theme, ...props } = defaultProps

  return (
    <Highlight {...props} code={code} language={language}>
      {({ tokens, getTokenProps }) => (
        <code className="relative inline flex-auto overflow-auto whitespace-normal">
          {tokens[0].map((token, i) => (
            <span key={`token-${i}`} {...getTokenProps({ token })} />
          ))}
        </code>
      )}
    </Highlight>
  )
}
