import type { Language } from 'prism-react-renderer'
import CodeBlock from '@/components/CodeBlock'
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid'
import React, { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

interface WindowProps extends CodeWindowProps {
  state: string
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
}

function Window({
  title,
  code,
  language,
  lineNumbers = true,
  onMinimize,
  onMaximize,
  onClose,
}: WindowProps) {
  return (
    <>
      <div className="-mb-px flex h-8 w-full items-center justify-between border-b border-primary-500/30 px-4 text-primary-400 dark:text-primary-500">
        <span className="truncate">{title}</span>
        <div className="flex items-center justify-end gap-x-2">
          <button className="h-4 w-4" onClick={onMinimize}>
            <MinusCircleIcon />
          </button>
          <button className="h-4 w-4" onClick={onMaximize}>
            <PlusCircleIcon />
          </button>
          <button className="h-4 w-4" onClick={onClose}>
            <XCircleIcon />
          </button>
        </div>
      </div>
      <div className="p-4">
        <CodeBlock code={code} language={language} lineNumbers={lineNumbers} />
      </div>
    </>
  )
}

function FixedWindow({ state, ...props }: WindowProps) {
  return (
    <div
      className={`h-fit overflow-hidden rounded-xl bg-primary-800 shadow-xl transition-all duration-500 dark:bg-primary-900/70 dark:ring-1 dark:ring-inset dark:ring-white/10 dark:backdrop-blur ${
        state === 'closed' ? 'max-h-8' : 'max-h-screen'
      }`}
    >
      <Window state={state} {...props} />
    </div>
  )
}

function FloatWindow({ onMinimize, ...props }: WindowProps) {
  return (
    <div
      className="fixed inset-0 z-[200] min-h-screen w-screen p-4 sm:p-6 md:p-[10vh] lg:p-[12vh]"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-primary-900/80"
        aria-hidden="true"
        onClick={onMinimize}
      />
      <div className="relative h-full overflow-hidden rounded-xl bg-primary-800 shadow-xl dark:bg-primary-900 dark:ring-1 dark:ring-inset dark:ring-white/10 dark:backdrop-blur">
        <Window onMinimize={onMinimize} {...props} />
      </div>
    </div>
  )
}

export interface CodeWindowProps {
  title?: string
  code: string
  language: Language
  lineNumbers?: string | boolean
}

export default function CodeWindow(props: CodeWindowProps) {
  const [state, setState] = useState<string>('open')

  const onMinimize = useCallback(() => setState('open'), [setState])
  const onMaximize = useCallback(() => setState('full'), [setState])
  const onClose = useCallback(() => setState('closed'), [setState])

  return (
    <>
      <FixedWindow
        state={state}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        {...props}
      />
      {state === 'full' &&
        createPortal(
          <FloatWindow
            state={state}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onClose={onClose}
            {...props}
          />,
          document.body
        )}
    </>
  )
}
