import React, { ReactNode } from 'react'
import Menu from '@/components/Menu'

interface BaseLayoutProps {
  children: ReactNode
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <header>
        <Menu />
      </header>
      <div className="mx-auto max-w-[90rem] overflow-hidden px-4 pt-16 sm:px-6 md:px-8 md:pt-20">
        {children}
      </div>
    </>
  )
}
