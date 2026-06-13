import React, { ReactNode } from 'react'

import { IconChevronRight } from '@tabler/icons-react'

export interface ISelectableTextItem {
  id: string
  title: ReactNode
}

interface SelectableTextProps {
  items: ISelectableTextItem[]
  selected: string
  onSelect(id: string): void
  size?: 'md' | 'lg'
  className?: string
}

const STYLES = {
  md: {
    chevron: '-ml-7 inline h-7 w-7 text-brand-500',
    text: 'text-lg tracking-tight transition-all duration-200 sm:text-xl',
    selected:
      'font-semibold text-primary-700 underline decoration-brand-500 decoration-2 underline-offset-8 dark:text-primary-200',
  },
  lg: {
    chevron: '-ml-8 inline h-8 w-8 text-brand-500 sm:-ml-9 sm:h-9 sm:w-9',
    text: 'text-lg tracking-tight transition-all duration-200 sm:text-3xl',
    selected:
      'font-semibold text-primary-700 underline decoration-brand-500 decoration-4 underline-offset-8 dark:text-primary-200',
  },
}

const UNSELECTED = 'text-primary-300 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-200'
const DEFAULT_WRAPPER = 'h-full w-full basis-full space-y-6 pl-9 lg:basis-1/3'

export default function SelectableText({ items, selected, onSelect, size = 'md', className }: SelectableTextProps) {
  const style = STYLES[size]

  return (
    <div className={className ?? DEFAULT_WRAPPER}>
      {items.map(({ id, title }) => (
        <button key={id} type="button" className="flex items-center focus:outline-none" onClick={() => onSelect(id)}>
          {selected === id && <IconChevronRight className={style.chevron} />}
          <span className={`${style.text} ${selected === id ? style.selected : UNSELECTED}`}>{title}</span>
        </button>
      ))}
    </div>
  )
}
