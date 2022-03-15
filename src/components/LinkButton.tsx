import React from 'react'
import Link from '@/components/Link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

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
      className={`dark:highlight-white/20 inline-flex h-full items-center rounded-full bg-brand-500 px-4 font-semibold text-primary-100 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-brand-50 dark:bg-brand-500 dark:hover:bg-brand-400 ${
        leftIcon && 'pl-2'
      } ${rightIcon && 'pr-2'} ${className}`}
    >
      {leftIcon && <ChevronLeftIcon className="h-4 pr-2" />}
      <span className="text-left text-sm">{text}</span>
      {rightIcon && <ChevronRightIcon className="h-4 pl-2" />}
    </Link>
  )
}
