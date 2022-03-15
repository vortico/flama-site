import React, { ReactNode } from 'react'
import Header from '@/components/Header'

export interface PlainLayoutProps {
  menuChildren?: ReactNode
  children: ReactNode
}

export default function PlainLayout({
  menuChildren,
  children,
}: PlainLayoutProps) {
  return (
    <>
      <Header>{menuChildren}</Header>
      <div className="mx-auto max-w-[90rem] overflow-hidden px-4 sm:px-6 md:px-8">
        {children}
      </div>
    </>
  )
}
