import React from 'react'

import HeaderLink from './HeaderLink'

export default function H6({ id, children, ...props }: React.ComponentProps<'h6'>) {
  return (
    <h6
      {...props}
      id={id}
      className="group -ml-8 mb-2 mt-8 flex items-center whitespace-pre-wrap pl-8 text-sm font-semibold text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h6>
  )
}
