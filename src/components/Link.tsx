import NextLink from 'next/link'
import React from 'react'

export default function Link({ href, className, children, ...props }: React.ComponentProps<'a'>) {
  return href?.startsWith('/') ? (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  ) : (
    <a className={className} href={href} {...props}>
      {children}
    </a>
  )
}
