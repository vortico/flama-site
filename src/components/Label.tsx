import React, { ReactNode } from 'react'

export interface LabelProps extends Omit<React.ComponentProps<'span'>, 'color'> {
  color?: string
  children?: ReactNode
}

const colorSelector: Record<string, string> = {
  brand: 'bg-brand-500 dark:bg-brand-400',
  primary: 'bg-primary-500 dark:bg-primary-400',
  slate: 'bg-slate-500 dark:bg-slate-400',
  gray: 'bg-gray-500 dark:bg-gray-400',
  zinc: 'bg-zinc-500 dark:bg-zinc-400',
  neutral: 'bg-neutral-500 dark:bg-neutral-400',
  stone: 'bg-stone-500 dark:bg-stone-400',
  red: 'bg-red-500 dark:bg-red-400',
  orange: 'bg-orange-500 dark:bg-orange-400',
  amber: 'bg-amber-500 dark:bg-amber-400',
  yellow: 'bg-yellow-500 dark:bg-yellow-400',
  lime: 'bg-lime-500 dark:bg-lime-400',
  green: 'bg-green-500 dark:bg-green-600',
  emerald: 'bg-emerald-500 dark:bg-emerald-400',
  teal: 'bg-teal-500 dark:bg-teal-400',
  cyan: 'bg-cyan-500 dark:bg-cyan-400',
  sky: 'bg-sky-500 dark:bg-sky-400',
  blue: 'bg-blue-500 dark:bg-blue-400',
  indigo: 'bg-indigo-500 dark:bg-indigo-400',
  violet: 'bg-violet-500 dark:bg-violet-400',
  purple: 'bg-purple-500 dark:bg-purple-400',
  fuchsia: 'bg-fuchsia-500 dark:bg-fuchsia-400',
  pink: 'bg-pink-500 dark:bg-pink-400',
  rose: 'bg-rose-500 dark:bg-rose-400',
}

export default function Label({ color = 'primary', children }: LabelProps) {
  const classColor = colorSelector?.[color] || colorSelector.primary

  return (
    <span
      className={`rounded-sm px-2 py-1 align-middle text-xs text-primary-50 shadow-xl dark:text-primary-200 ${classColor}`}
    >
      {children}
    </span>
  )
}
