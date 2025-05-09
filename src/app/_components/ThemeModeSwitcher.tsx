'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { IconBrushOff, IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'

export default function ThemeModeSwitcher({ ...props }: React.ComponentProps<'button'>) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const onSwitch = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  useEffect(() => setMounted(true), [])

  return (
    <button aria-label="Theme Mode Switcher" type="button" {...props} onClick={onSwitch}>
      {mounted ? (
        theme === 'light' ? (
          <IconSun className="h-full w-full" />
        ) : (
          <IconMoon className="h-full w-full" />
        )
      ) : (
        <IconBrushOff className="h-full w-full" />
      )}
    </button>
  )
}
