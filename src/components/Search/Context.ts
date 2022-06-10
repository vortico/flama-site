import { createContext } from 'react'

export interface ISearchContext {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onInput: (event: KeyboardEvent) => void
}

export const SearchContext = createContext<ISearchContext>({
  isOpen: false,
  onOpen: () => undefined,
  onClose: () => undefined,
  onInput: () => undefined,
})
