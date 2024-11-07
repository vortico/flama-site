import React from 'react'

import { VorticoIcon } from '@/components/icons'

export default function HorizontalLogo() {
  return (
    <div className="flex items-center justify-start gap-2" aria-label="Flama logo">
      <VorticoIcon className="h-8 w-8 text-brand" />
      <span className="text-2xl text-brand">Flama</span>
    </div>
  )
}
