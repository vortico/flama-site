import { Blog as IBlog } from '@/contentlayer'
import { createContext } from 'react'

export interface BlogContext {
  blog?: IBlog
}

export const BlogContext = createContext<BlogContext>({
  blog: undefined,
})
