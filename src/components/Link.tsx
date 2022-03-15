import React from 'react'
import NextLink from 'next/link'

export default function Link({
  href,
  className,
  children,
  ...props
}: React.ComponentProps<'a'>) {
  return href?.startsWith('/') ? (
    <NextLink href={href}>
      <a className={className} {...props}>
        {children}
      </a>
    </NextLink>
  ) : (
    <a className={className} href={href} {...props}>
      {children}
    </a>
  )
}
