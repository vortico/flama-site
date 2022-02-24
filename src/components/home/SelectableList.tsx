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

function SelectableItem({
  id,
  name,
  icon,
  selected,
  onSelect,
}: SelectableItemsProps) {
  return (
    <button
      type="button"
      className={`group md:text-md flex w-full flex-col items-center gap-6 text-xs font-semibold ${
        selected == id
          ? 'text-brand-600 dark:text-brand-400'
          : 'text-zinc-600 dark:text-zinc-400'
      }`}
      onClick={() => {
        onSelect(id)
      }}
    >
      <div className="h-12 w-12">{icon}</div>
      {name}
    </button>
  )
}

interface SelectableListProps {
  items: ISelectableItem[]
  selected: string

  onSelect(id: string): void
}

export function SelectableList({
  items,
  selected,
  onSelect,
}: SelectableListProps) {
  return (
    <ul className="inline-grid w-full grid-cols-4 items-center md:mx-10 md:grid-cols-6 lg:mx-4 lg:grid-cols-8 xl:grid-cols-10">
      {items.map(({ id, name, icon }) => (
        <li key={name}>
          <SelectableItem
            id={id}
            name={name}
            icon={icon}
            selected={selected}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  )
}
