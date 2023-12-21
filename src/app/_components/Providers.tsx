'use client'

import React, { type ReactNode } from 'react'

import { ThemeProvider } from 'next-themes'

import { SearchProvider } from '@/components/Search'

export default function Body({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <ThemeProvider defaultTheme="system" attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </SearchProvider>
  )
}
