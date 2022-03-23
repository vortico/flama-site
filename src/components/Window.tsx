import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid'
import React, { useCallback, useState } from 'react'

export interface WindowProps extends React.ComponentProps<'div'> {
  title?: string
}

export default function Window({ title, className, children }: WindowProps) {
  const [state, setState] = useState<string>('open')

  const onMinimize = useCallback(() => setState('open'), [setState])
  const onMaximize = useCallback(() => setState('full'), [setState])
  const onClose = useCallback(() => setState('closed'), [setState])

  const floatProps = {
    className: `fixed inset-0 z-[200] min-h-screen w-screen p-4 sm:p-6 md:p-[10vh] lg:p-[12vh] ${className}`,
    'aria-modal': true,
    role: 'dialog',
  }

  const fixedProps = {
    className: `relative h-full w-full ${className}`,
  }

  return (
    <div {...(state === 'full' ? floatProps : fixedProps)}>
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
          'h-fit max-h-[31px] transition-all duration-500 dark:bg-primary-900/70'
        } ${
          state === 'full' &&
          'h-full max-h-screen transition-none dark:bg-primary-900'
        } ${
          state === 'open' &&
          'h-fit max-h-screen transition-all duration-500 dark:bg-primary-900/70'
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
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  )
}
