import React from 'react'

import HeaderLink from './HeaderLink'

export default function H1({ id, children, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      id={id}
      className="group -ml-8 mb-4 mt-10 flex items-center whitespace-pre-wrap pl-8 text-3xl font-bold tracking-tight text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h1>
  )
}
