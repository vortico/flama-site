'use client'

import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

import { IconCircleDotFilled, IconCirclePlusFilled, IconCircleXFilled } from '@tabler/icons-react'

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
        <div className="fixed inset-0 bg-primary-950/30 backdrop-blur-sm" aria-hidden={true} onClick={onMinimize} />
      )}
      <div
        className={`h-full overflow-hidden border border-primary-300 bg-primary-900 shadow-md shadow-primary-300 dark:border-primary-600 dark:shadow-primary-600 ${
          state === 'closed'
            ? 'relative max-h-[32px]'
            : state === 'full'
              ? 'fixed inset-x-4 inset-y-[5vh] max-h-[calc(85vh+2rem+3px)] sm:inset-x-6 md:inset-x-8'
              : state === 'open'
                ? 'relative max-h-full'
                : ''
        } ${className || ''}`}
      >
        <div className="flex h-[calc(2rem-1px)] w-full flex-none items-center justify-between border-b border-primary-300 bg-primary-900 px-4 dark:border-primary-600 dark:bg-primary-950">
          <span className="truncate font-alternative text-sm font-semibold leading-8 text-primary-200">{title}</span>
          <div className="flex items-center justify-end gap-x-2">
            <button className="h-4 w-4 cursor-pointer" onClick={onMinimize} aria-label="Minimize Window">
              <IconCircleDotFilled className="h-full w-full text-primary-300 transition-colors duration-200 hover:text-ciclon dark:text-primary-600 dark:hover:text-ciclon" />
            </button>
            <button className="h-4 w-4 cursor-pointer" onClick={onMaximize} aria-label="Maximize Window">
              <IconCirclePlusFilled className="h-full w-full text-primary-300 transition-colors duration-200 hover:text-bosque dark:text-primary-600 dark:hover:text-bosque" />
            </button>
            <button className="h-4 w-4 cursor-pointer" onClick={onClose} aria-label="Close Window">
              <IconCircleXFilled className="h-full w-full text-primary-300 transition-colors duration-200 hover:text-flama dark:text-primary-600 dark:hover:text-flama" />
            </button>
          </div>
        </div>
        <div
          ref={containerRef}
          className={`h-full w-full bg-primary-900 dark:bg-primary-950 ${
            state === 'closed'
              ? 'max-h-0'
              : state === 'full'
                ? 'max-h-[calc(100%-2rem-1px)]'
                : state === 'open'
                  ? 'max-h-[calc(100%-2rem-1px)]'
                  : ''
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
