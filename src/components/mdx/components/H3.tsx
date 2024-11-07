import React from 'react'

import HeaderLink from './HeaderLink'

export default function H3({ id, children, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      {...props}
      id={id}
      className="group -ml-8 mb-3 mt-10 flex items-center whitespace-pre-wrap pl-8 text-xl font-bold tracking-tight text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h3>
  )
}
