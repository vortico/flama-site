import React from 'react'

import HeaderLink from './HeaderLink'

export default function H2({ id, children, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      id={id}
      className="group -ml-8 mb-4 mt-10 flex items-center whitespace-pre-wrap pl-8 text-2xl font-bold tracking-tight text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h2>
  )
}
