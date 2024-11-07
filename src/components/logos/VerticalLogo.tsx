import React from 'react'

import { FlamaIcon } from '@/components/icons'

export default function VerticalLogo() {
  return (
    <div className="flex flex-col items-center justify-start" aria-label="Flama logo">
      <FlamaIcon className="h-16 w-16 text-brand" />
      <span className="text-xs text-brand">Flama</span>
    </div>
  )
}
