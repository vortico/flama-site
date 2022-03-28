import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid'
import React, { useCallback, useState } from 'react'

export interface WindowProps extends React.ComponentProps<'div'> {
  title?: string
}

export default function Window({ title, children }: WindowProps) {
  const [state, setState] = useState<string>('open')

  const onMinimize = useCallback(() => setState('open'), [setState])
  const onMaximize = useCallback(() => setState('full'), [setState])
  const onClose = useCallback(() => setState('closed'), [setState])

  const floatProps = {
    className:
      'fixed inset-0 z-[200] min-h-screen w-screen py-[5vh] px-4 sm:px-6 md:px-8',
    'aria-modal': true,
    role: 'dialog',
  }

  const relativeProps = {
    className: 'relative',
  }

  return (
    <div {...(state === 'full' ? floatProps : relativeProps)}>
      {state === 'full' && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-primary-900/80"
          aria-hidden="true"
          onClick={onMinimize}
        />
      )}
      <div
        className={`relative overflow-hidden rounded-xl bg-primary-800 shadow-xl dark:ring-1 dark:ring-inset dark:ring-white/10 dark:backdrop-blur ${
          state === 'closed' &&
          'h-fit transition-all duration-500 dark:bg-primary-900/70'
        } ${state === 'full' && 'h-fit transition-none dark:bg-primary-900'} ${
          state === 'open' &&
          'h-fit transition-all duration-500 dark:bg-primary-900/70'
        }`}
      >
        <div className="-mb-px flex h-8 w-full items-center justify-between border-b border-primary-500 px-4 text-primary-400 dark:border-primary-500/30 dark:text-primary-500">
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
        <div
          className={`max-w-full overflow-auto duration-500 ${
            state === 'closed' ? 'max-h-0 transition-all ' : ''
          } ${
            state === 'full' ? 'max-h-[calc(90vh-31px)] transition-none' : ''
          } ${state === 'open' ? 'max-h-[50vh] transition-all' : ''}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
