'use client'

import React, { useEffect, useMemo, useState } from 'react'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

export default function Link({ href, children, className, ...props }: React.ComponentProps<'a'>) {
  const [origin, setOrigin] = useState<string | null>(null)

  const pathname = usePathname()

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [setOrigin])

  const isAnchor = useMemo<boolean>(
    () =>
      href === undefined ||
      href.startsWith('#') ||
      href.startsWith('?') ||
      (origin !== null && new URL(pathname, origin).pathname === new URL(href, origin).pathname),
    [href, origin, pathname],
  )

  if (href === undefined)
    return (
      <a className={className} {...props}>
        {children}
      </a>
    )

  return isAnchor ? (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ) : (
    <NextLink href={href} className={`text-brand ${className}`}>
      {children}
    </NextLink>
  )
}
