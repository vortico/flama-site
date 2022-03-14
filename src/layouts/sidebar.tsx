import React, { ReactNode } from 'react'
import PlainLayout, { PlainLayoutProps } from '@/layouts/plain'

export interface SidebarLayoutProps extends PlainLayoutProps {
  sidebar: ReactNode
  children: ReactNode
}

export default function SidebarLayout({
  sidebar,
  children,
  ...props
}: SidebarLayoutProps) {
  return (
    <PlainLayout {...props}>
      <div className="fixed bottom-0 top-16 left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-[19.5rem] overflow-y-auto px-8 pb-10 md:top-20 lg:block">
        {sidebar}
      </div>
      <main className="mt-8 mb-20 max-w-5xl sm:mb-32 md:mb-40 lg:pl-[20rem]">
        {children}
      </main>
    </PlainLayout>
  )
}
