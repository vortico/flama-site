'use client'

import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

import { IconCircleMinus, IconCirclePlus, IconCircleX } from '@tabler/icons-react'

export interface WindowProps extends React.ComponentProps<'div'> {
  title?: string
  autoScroll?: MutableRefObject<HTMLDivElement | null>
}

export default function Window({ title, autoScroll, className, children }: WindowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'open' | 'closed' | 'full'>('open')

  const onMinimize = useCallback(() => setState(state === 'open' ? 'closed' : 'open'), [state, setState])
  const onMaximize = useCallback(() => setState('full'), [setState])
  const onClose = useCallback(() => setState('closed'), [setState])

  useEffect(() => {
    if (containerRef.current && autoScroll?.current)
      containerRef.current.scrollTo({
        top: autoScroll.current.offsetTop - containerRef.current.clientHeight / 2,
        left: 0,
        behavior: 'smooth',
      })
  }, [autoScroll, containerRef])

  return (
    <div
      className={state === 'full' ? 'fixed inset-0 z-50 h-screen w-screen overflow-hidden' : 'relative h-full w-full'}
      {...(state === 'full' && { 'aria-modal': true, role: 'dialog' })}
    >
      {state === 'full' && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-primary-900/80"
          aria-hidden={true}
          onClick={onMinimize}
        />
      )}
      <div
        className={`h-fit overflow-hidden rounded-xl bg-primary-800 shadow-xl ${
          state === 'closed' ? 'relative max-h-[30px] dark:bg-primary-950/70' : ''
        } ${state === 'full' ? 'fixed inset-x-4 inset-y-[5vh] dark:bg-primary-950 sm:inset-x-6 md:inset-x-8' : ''} ${
          state === 'open' ? 'relative dark:bg-primary-950/70' : ''
        } ${className || ''}`}
      >
        <div className="mb-px flex h-8 w-full items-center justify-between border-b border-primary-500 px-4 text-primary-300 dark:border-primary-500/30 dark:text-primary-400">
          <span className="truncate font-semibold">{title}</span>
          <div className="flex items-center justify-end gap-x-2">
            <button className="h-4 w-4" onClick={onMinimize} aria-label="Minimize Window">
              <IconCircleMinus className="h-full w-full" />
            </button>
            <button className="h-4 w-4" onClick={onMaximize} aria-label="Maximize Window">
              <IconCirclePlus className="h-full w-full" />
            </button>
            <button className="h-4 w-4" onClick={onClose} aria-label="Close Window">
              <IconCircleX className="h-full w-full" />
            </button>
          </div>
        </div>
        <div
          ref={containerRef}
          className={`-mt-px w-full overflow-auto ${state === 'closed' ? 'max-h-0' : ''} ${
            state === 'full' ? 'max-h-[85vh]' : ''
          } ${state === 'open' ? 'max-h-full' : ''}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
