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
      {children}
    </>
  )
}
