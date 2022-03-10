import React from 'react'
import ErrorLayout from '@/layouts/error'

export default function Home() {
  return <ErrorLayout code="404" description="This page could not be found." />
}
