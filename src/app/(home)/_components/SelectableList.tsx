import React, { ReactNode } from 'react'

export interface ISelectableItem {
  id: string
  name: string
  icon: ReactNode
}

interface SelectableItemsProps {
  id: string
  name: string
  icon: ReactNode
  selected: string

  onSelect(id: string): void
}

function SelectableItem({ id, name, icon, selected, onSelect }: SelectableItemsProps) {
  return (
    <button
      type="button"
      className={`md:text-md group flex w-full flex-col items-center gap-6 text-xs font-semibold transition-colors duration-200 ${
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

interface SelectableListProps {
  items: ISelectableItem[]
  selected: string

  onSelect(id: string): void
}

export default function SelectableList({ items, selected, onSelect }: SelectableListProps) {
  return (
    <ul className="inline-grid w-full grid-cols-4 items-center">
      {items.map(({ id, name, icon }) => (
        <li key={name}>
          <SelectableItem id={id} name={name} icon={icon} selected={selected} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}
