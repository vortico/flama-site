import Highlight, { defaultProps } from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'

export interface CodeBlockProps {
  code: string
  language: Language
  lineNumbers?: string | boolean
}

export default function CodeBlock({
  code,
  language,
  lineNumbers = true,
}: CodeBlockProps) {
  const { theme, ...props } = defaultProps

  return (
    <Highlight {...props} code={code} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`flex min-h-full gap-x-4 overflow-auto whitespace-pre text-left text-sm leading-6 ${className}`}
        >
          {lineNumbers && (
            <div
              className="hidden flex-none select-none text-right text-primary-500 md:block"
              aria-hidden="true"
            >
              {Array.from(Array(tokens.length).keys()).map((line) => (
                <div key={`line-number-${line}`} className="line-number">
                  {lineNumbers === true ? line : lineNumbers}
                </div>
              ))}
            </div>
          )}
          <code className="relative block flex-auto overflow-auto">
            {tokens.map((line, i) => (
              <div key={`line-code-${i}`} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
