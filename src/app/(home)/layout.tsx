import React from 'react'

import { Footer } from './_components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
