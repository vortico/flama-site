import React, { ReactNode } from 'react'

export interface LabelProps
  extends Omit<React.ComponentProps<'span'>, 'color'> {
  color?: string
  children?: ReactNode
}

const colorSelector: Record<string, string> = {
  brand:
    'text-brand-500 ring-brand-500 dark:text-brand-400 dark:ring-brand-400',
  primary:
    'text-primary-500 ring-primary-500 dark:text-primary-400 dark:ring-primary-400',
  slate:
    'text-slate-500 ring-slate-500 dark:text-slate-400 dark:ring-slate-400',
  gray: 'text-gray-500 ring-gray-500 dark:text-gray-400 dark:ring-gray-400',
  zinc: 'text-zinc-500 ring-zinc-500 dark:text-zinc-400 dark:ring-zinc-400',
  neutral:
    'text-neutral-500 ring-neutral-500 dark:text-neutral-400 dark:ring-neutral-400',
  stone:
    'text-stone-500 ring-stone-500 dark:text-stone-400 dark:ring-stone-400',
  red: 'text-red-500 ring-red-500 dark:text-red-400 dark:ring-red-400',
  orange:
    'text-orange-500 ring-orange-500 dark:text-orange-400 dark:ring-orange-400',
  amber:
    'text-amber-500 ring-amber-500 dark:text-amber-400 dark:ring-amber-400',
  yellow:
    'text-yellow-500 ring-yellow-500 dark:text-yellow-400 dark:ring-yellow-400',
  lime: 'text-lime-500 ring-lime-500 dark:text-lime-400 dark:ring-lime-400',
  green:
    'text-green-500 ring-green-500 dark:text-green-400 dark:ring-green-400',
  emerald:
    'text-emerald-500 ring-emerald-500 dark:text-emerald-400 dark:ring-emerald-400',
  teal: 'text-teal-500 ring-teal-500 dark:text-teal-400 dark:ring-teal-400',
  cyan: 'text-cyan-500 ring-cyan-500 dark:text-cyan-400 dark:ring-cyan-400',
  sky: 'text-sky-500 ring-sky-500 dark:text-sky-400 dark:ring-sky-400',
  blue: 'text-blue-500 ring-blue-500 dark:text-blue-400 dark:ring-blue-400',
  indigo:
    'text-indigo-500 ring-indigo-500 dark:text-indigo-400 dark:ring-indigo-400',
  violet:
    'text-violet-500 ring-violet-500 dark:text-violet-400 dark:ring-violet-400',
  purple:
    'text-purple-500 ring-purple-500 dark:text-purple-400 dark:ring-purple-400',
  fuchsia:
    'text-fuchsia-500 ring-fuchsia-500 dark:text-fuchsia-400 dark:ring-fuchsia-400',
  pink: 'text-pink-500 ring-pink-500 dark:text-pink-400 dark:ring-pink-400',
  rose: 'text-rose-500 ring-rose-500 dark:text-rose-400 dark:ring-rose-400',
}

export default function Label({ color = 'primary', children }: LabelProps) {
  const classColor = colorSelector?.[color] || colorSelector.primary

  return (
    <span
      className={`rounded-sm px-2 py-1 align-middle text-xs shadow-xl ring-1 ring-inset ${classColor}`}
    >
      {children}
    </span>
  )
}
