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
      className={`absolute right-4 top-11 flex h-8 w-8 items-center justify-center rounded bg-primary-500/30 opacity-0 ring-1 ring-inset backdrop-blur transition-opacity duration-500 group-hover:opacity-100 ${
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

interface LineNumbersProps {
  lines: number
  token?: string
}

function LineNumbers({ lines, token }: LineNumbersProps) {
  return (
    <div
      className="hidden flex-none select-none text-right text-primary-500 md:block"
      aria-hidden="true"
    >
      {Array.from(Array(lines).keys()).map((line) => (
        <div key={`line-number-${line}`} className="line-number">
          {token ? token : line}
        </div>
      ))}
    </div>
  )
}

interface CodeWrapperProps extends React.ComponentProps<'pre'> {
  lines: number
  token?: string | boolean
  code: string
  copyButton?: boolean
}

function CodeWrapper({
  lines,
  token,
  code,
  copyButton,
  children,
  className,
}: CodeWrapperProps) {
  return (
    <pre
      className={`group flex min-h-full gap-x-4 overflow-auto whitespace-pre p-4 text-left text-sm leading-6 ${className}`}
    >
      {token && (
        <LineNumbers
          lines={lines}
          token={typeof token === 'string' ? token : undefined}
        />
      )}
      <code className="relative block flex-auto overflow-auto text-primary-200">
        {children}
      </code>
      {copyButton && <ClipboardButton code={code} />}
    </pre>
  )
}

export interface CodeBlockProps {
  code: string
  language?: Language
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

  return language ? (
    <Highlight {...props} code={code} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <CodeWrapper
          lines={tokens.length}
          token={lineNumbers}
          code={code}
          copyButton={copyButton}
          className={className}
        >
          {tokens.map((line, i) => (
            <div key={`line-code-${i}`} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </CodeWrapper>
      )}
    </Highlight>
  ) : (
    <CodeWrapper
      lines={code.split('\n').length}
      token={lineNumbers}
      code={code}
      copyButton={copyButton}
    >
      {code}
    </CodeWrapper>
  )
}
