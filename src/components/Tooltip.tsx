import React, { ReactNode } from 'react'

export interface TooltipProps extends React.ComponentProps<'div'> {
  orientation?: string
  children?: ReactNode
}

const orientationSelector: Record<string, string> = {
  'bottom-left':
    '-right-4 -bottom-4 translate-y-full after:right-5 after:bottom-[100%] after:border-x-transparent after:border-t-transparent after:border-b-brand-500 after:dark:border-b-brand-600',
  'bottom-center':
    'left-1/2 -bottom-4 -translate-x-1/2 translate-y-full after:left-1/2 after:bottom-[100%] after:-translate-x-1/2 after:border-x-transparent after:border-t-transparent after:border-b-brand-500 after:dark:border-b-brand-600',
  'bottom-right':
    '-left-4 -bottom-4 translate-y-full after:left-5 after:bottom-[100%] after:border-x-transparent after:border-t-transparent after:border-b-brand-500 after:dark:border-b-brand-600',
  'top-left':
    '-right-4 -top-4 -translate-y-full after:right-5 after:top-[100%] after:border-x-transparent after:border-b-transparent after:border-t-brand-500 after:dark:border-t-brand-600',
  'top-center':
    'left-1/2 -top-4 -translate-x-1/2 -translate-y-full after:left-1/2 after:top-[100%] after:border-x-transparent after:border-b-transparent after:border-t-brand-500 after:dark:border-t-brand-600',
  'top-right':
    '-left-4 -top-4 -translate-y-full after:left-5 after:top-[100%] after:border-x-transparent after:border-b-transparent after:border-t-brand-500 after:dark:border-t-brand-600',
}

export default function Tooltip({ orientation = 'bottom-center', className, children }: TooltipProps) {
  const orientationClass = orientationSelector?.[orientation] || orientationSelector['bottom-center']

  return (
    <div className={className}>
      <div
        className={`absolute z-20 rounded-lg bg-brand-500 after:absolute after:border-8 after:content-[''] dark:bg-brand-600 ${orientationClass}`}
      >
        {children}
      </div>
    </div>
  )
}
