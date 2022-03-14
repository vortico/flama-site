import React, { ReactNode } from 'react'
import MainHeader from '@/components/header/MainHeader'

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
      <MainHeader>{menuChildren}</MainHeader>
      <div className="mx-auto max-w-[90rem] overflow-hidden px-4 sm:px-6 md:px-8">
        {children}
      </div>
    </>
  )
}
