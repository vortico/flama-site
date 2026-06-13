import React, { ReactNode } from 'react'

export interface ISelectableIconItem {
  id: string
  name: string
  icon: ReactNode
}

interface SelectableIconProps {
  id: string
  name: string
  icon: ReactNode
  selected: string

  onSelect(id: string): void
}

function SelectableIcon({ id, name, icon, selected, onSelect }: SelectableIconProps) {
  return (
    <button
      type="button"
      className={`md:text-md group flex w-full flex-col items-center gap-6 text-xs font-semibold transition-colors duration-200 focus:outline-none ${
        selected == id
          ? 'text-brand-500'
          : 'text-primary-600 hover:text-brand-600 dark:text-primary-400 dark:hover:text-brand-400'
      }`}
      onClick={() => {
        onSelect(id)
      }}
    >
      <div className="h-12 w-12">{icon}</div>
      <div className="text-sm font-normal">{name}</div>
    </button>
  )
}

interface SelectableIconsProps {
  items: ISelectableIconItem[]
  selected: string

  onSelect(id: string): void
}

const GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export default function SelectableIcons({ items, selected, onSelect }: SelectableIconsProps) {
  const colsClass = GRID_COLS[items.length] ?? 'grid-cols-4'

  return (
    <ul className={`inline-grid w-full items-center ${colsClass}`}>
      {items.map(({ id, name, icon }) => (
        <li key={name}>
          <SelectableIcon id={id} name={name} icon={icon} selected={selected} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}
