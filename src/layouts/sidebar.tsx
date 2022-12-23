import PlainLayout, { PlainLayoutProps } from '@/layouts/plain'
import React, { ReactNode } from 'react'

export interface SidebarLayoutProps extends PlainLayoutProps {
  sidebar: ReactNode
  children: ReactNode
}

export default function SidebarLayout({ sidebar, children, ...props }: SidebarLayoutProps) {
  return (
    <PlainLayout {...props}>
      <div className="mx-auto max-w-[90rem] overflow-hidden">
        <div className="fixed bottom-0 top-20 z-20 hidden w-80 overflow-y-auto px-4 sm:px-6 md:px-8 lg:block">
          {sidebar}
        </div>
        <main className="mb-20 px-4 pt-8 sm:mb-32 sm:px-6 md:mb-40 md:px-8 lg:ml-80">{children}</main>
      </div>
    </PlainLayout>
  )
}
