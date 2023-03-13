import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

export default function Link({ href, children, ...props }: React.ComponentProps<'a'>) {
  const { asPath } = useRouter()
  const [origin, setOrigin] = useState<string | null>(null)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [setOrigin])

  const isAnchor = useMemo<boolean>(
    () =>
      href === undefined ||
      href.startsWith('#') ||
      (origin !== null && new URL(asPath, origin).pathname === new URL(href, origin).pathname),
    [href, origin, asPath]
  )

  if (href === undefined) return <a>{children}</a>

  return isAnchor ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <NextLink href={href}>{children}</NextLink>
  )
}
