import Link from '@/components/Link'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import React from 'react'

interface PrevNextNavigationProps {
  prevTitle: string
  prevHref: string
  nextTitle: string
  nextHref: string
}

export function PrevNextNavigation({ prevTitle, prevHref, nextTitle, nextHref }: PrevNextNavigationProps) {
  return (
    <div
      className={`mt-10 flex items-center ${prevTitle && nextTitle ? 'justify-between' : ''} ${
        prevTitle && !nextTitle ? 'justify-start' : ''
      } ${!prevTitle && nextTitle ? 'justify-end' : ''}`}
    >
      {prevTitle && (
        <Link className="inline-flex h-full items-center pr-2" href={prevHref}>
          <IconChevronLeft className="h-4 w-4 pr-2" />
          <span>{prevTitle}</span>
        </Link>
      )}
      {nextTitle && (
        <Link className="inline-flex h-full items-center pl-2" href={nextHref}>
          <span>{nextTitle}</span>
          <IconChevronRight className="h-4 w-4 pl-2" />
        </Link>
      )}
    </div>
  )
}
