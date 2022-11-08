import React from 'react'
import NextLink from 'next/link'

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
