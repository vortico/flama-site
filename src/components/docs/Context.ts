import { Docs as IDocs } from '@/contentlayer'
import { createContext } from 'react'

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
