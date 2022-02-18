import { useTheme } from 'next-themes'
import React from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'

export default function ThemeModeSwitcher({
  ...props
}: React.ComponentProps<'button'>) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      aria-label="Theme Mode Switcher"
      type="button"
      {...props}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
