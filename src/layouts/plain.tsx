import Header from '@/components/Header'
import React, { ReactNode } from 'react'

export interface PlainLayoutProps {
  menuChildren?: ReactNode
  children: ReactNode
}

export default function PlainLayout({ menuChildren, children }: PlainLayoutProps) {
  return (
    <>
      <Header>{menuChildren}</Header>
      <div className="overflow-hidden px-4 sm:px-6 md:px-8"></div>
      {children}
    </>
  )
}
