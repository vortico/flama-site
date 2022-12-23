import ErrorLayout from '@/layouts/error'
import React from 'react'

export default function Home() {
  return <ErrorLayout code="500" description="Internal Server Error" />
}
