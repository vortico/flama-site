import { createContext } from 'react'
import { Docs as IDocs } from '@/contentlayer'

export interface DocsContext {
  docs?: IDocs
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const DocsContext = createContext<DocsContext>({
  docs: undefined,
  isOpen: false,
  onOpen: () => undefined,
  onClose: () => undefined,
})
