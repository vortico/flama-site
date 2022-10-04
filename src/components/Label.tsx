import React, { ReactNode } from 'react'

enum Color {
  brand,
  primary,
  cyan,
  blue,
}

export interface LabelProps
  extends Omit<React.ComponentProps<'span'>, 'color'> {
  color?: Color
  children?: ReactNode
}

export default function Label({ color, children }: LabelProps) {
  let classColor
  switch (color) {
    case Color.brand:
      classColor =
        'text-brand-500 ring-brand-500 dark:text-brand-400 dark:ring-brand-400'
      break

    case Color.cyan:
      classColor =
        'text-cyan-500 ring-cyan-500 dark:text-cyan-400 dark:ring-cyan-400'
      break

    case Color.blue:
      classColor =
        'text-blue-500 ring-blue-500 dark:text-blue-400 dark:ring-blue-400'
      break

    case Color.primary:
    default:
      classColor =
        'text-primary-500 ring-primary-500 dark:text-primary-400 dark:ring-primary-400'
      break
  }
  return (
    <span
      className={`ml-3 rounded-sm px-1.5 py-0.5 text-xs shadow-xl ring-1 ring-inset ${classColor}`}
    >
      {children}
    </span>
  )
}
