import Highlight, { defaultProps } from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'
import { CheckIcon, DuplicateIcon } from '@heroicons/react/outline'
import { useCallback, useState } from 'react'

interface ClipboardButtonProps {
  code: string
}

function ClipboardButton({ code }: ClipboardButtonProps) {
  const [copied, setCopied] = useState<boolean>(false)

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }, [code, setCopied])

  return (
    <div
      className={`absolute right-4 top-11 flex h-8 w-8 items-center justify-center rounded bg-primary-500/30 opacity-0 ring-1 ring-inset backdrop-blur transition-none transition-all duration-500 group-hover:opacity-100 ${
        copied ? 'ring-brand-500/50' : 'ring-primary-500/50'
      }`}
    >
      <button onClick={onCopy}>
        {copied ? (
          <CheckIcon className="h-6 w-6 text-brand-500" />
        ) : (
          <DuplicateIcon className="h-6 w-6 text-primary-500" />
        )}
      </button>
    </div>
  )
}

export interface CodeBlockProps {
  code: string
  language: Language
  lineNumbers?: string | boolean
  copyButton?: boolean
}

export default function CodeBlock({
  code,
  language,
  lineNumbers = true,
  copyButton = true,
}: CodeBlockProps) {
  const { theme, ...props } = defaultProps

  return (
    <Highlight {...props} code={code} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`group flex min-h-full gap-x-4 overflow-auto whitespace-pre text-left text-sm leading-6 ${className}`}
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
          {copyButton && <ClipboardButton code={code} />}
        </pre>
      )}
    </Highlight>
  )
}
