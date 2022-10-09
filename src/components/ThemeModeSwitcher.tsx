import { useTheme } from 'next-themes'
import React, { useCallback, useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function ThemeModeSwitcher({ ...props }: React.ComponentProps<'button'>) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const onSwitch = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button aria-label="Theme Mode Switcher" type="button" {...props} onClick={onSwitch}>
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
