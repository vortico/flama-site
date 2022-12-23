import ErrorLayout from '@/layouts/error'
import React from 'react'

export default function Home() {
  return <ErrorLayout code="404" description="This page could not be found." />
}
