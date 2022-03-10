import React from 'react'
import ErrorLayout from '@/layouts/error'

export default function Home() {
  return <ErrorLayout code="500" description="Internal Server Error" />
}
