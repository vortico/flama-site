import React from 'react'

type LogoProps = {
  className: string
} & React.ComponentProps<'img'>

export function Logo({ className, ...props }: LogoProps) {
  return (
    <img
      className={`text-slate-900 dark:text-white ${className}`}
      src="/images/flama-logo.svg"
      alt="Flama logo"
      {...props}
    />
  )
}
