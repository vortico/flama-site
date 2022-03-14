import { createContext } from 'react'
import { Blog as IBlog } from '@/contentlayer'

export interface BlogContext {
  blog?: IBlog
}

export const BlogContext = createContext<BlogContext>({
  blog: undefined,
})
