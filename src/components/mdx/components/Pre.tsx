import React from 'react'

import { Window } from '@/components/elements'

export default function Pre({ children }: React.ComponentProps<'pre'>) {
  return <Window>{children}</Window>
}
