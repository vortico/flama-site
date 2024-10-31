'use client'

import { useEffect, useState } from 'react'

export type ActionKey = [string, string]

const ACTION_KEY_DEFAULT: ActionKey = ['Ctrl ', 'Control']
const ACTION_KEY_APPLE: ActionKey = ['⌘', 'Command']

export function useActionKey() {
  const [actionKey, setActionKey] = useState<ActionKey>(['', ''])

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setActionKey(ACTION_KEY_APPLE)
      } else {
        setActionKey(ACTION_KEY_DEFAULT)
      }
    }
  }, [])

  return actionKey
}
