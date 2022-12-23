import Link from '@/components/Link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import React from 'react'

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
      className={`inline-flex h-full items-center rounded-full bg-brand-50 px-4 text-brand-700 hover:bg-brand-200 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:bg-primary-600 dark:hover:text-primary-50 dark:focus:ring-primary-500 ${
        leftIcon && 'pl-2'
      } ${rightIcon && 'pr-2'} ${className}`}
    >
      {leftIcon && <ChevronLeftIcon className="h-4 pr-2" />}
      <span className="text-left text-sm font-semibold">{text}</span>
      {rightIcon && <ChevronRightIcon className="h-4 pl-2" />}
    </Link>
  )
}
