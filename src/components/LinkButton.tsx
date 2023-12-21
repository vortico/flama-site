import React from 'react'

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import Link from '@/components/Link'

interface LinkButtonProps extends React.ComponentProps<'a'> {
  text: string
  leftIcon?: boolean
  rightIcon?: boolean
}

export default function LinkButton({
  text,
  leftIcon = false,
  rightIcon = false,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={`inline-flex h-full items-center rounded-full bg-brand-200 px-4 text-brand-700 transition-colors duration-200 hover:bg-brand-300 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 dark:bg-primary-600 dark:text-primary-100 dark:hover:bg-primary-500 dark:hover:text-primary-50 dark:focus:ring-primary-500 ${
        leftIcon && 'pl-2'
      } ${rightIcon && 'pr-2'} ${className}`}
    >
      {leftIcon && <IconChevronLeft className="h-4 w-4 pr-2" />}
      <span className="text-left text-sm font-semibold">{text}</span>
      {rightIcon && <IconChevronRight className="h-4 w-4 pl-2" />}
    </Link>
  )
}
