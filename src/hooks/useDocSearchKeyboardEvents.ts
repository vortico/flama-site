import { useEffect } from 'react'

interface Props {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export function useDocSearchKeyboardEvents({ isOpen, onOpen, onClose }: Props) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      function open() {
        if (!document.body.classList.contains('DocSearch--active')) {
          onOpen()
        }
      }

      if (
        (event.code === 'Escape' && isOpen) ||
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (!isEditingContent(event) && event.key === '/' && !isOpen)
      ) {
        event.preventDefault()

        if (isOpen) {
          onClose()
        } else if (!document.body.classList.contains('DocSearch--active')) {
          open()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onOpen, onClose])
}

function isEditingContent(event: KeyboardEvent) {
  const element = event.target as HTMLElement
  const tagName = element.tagName
  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  )
}
