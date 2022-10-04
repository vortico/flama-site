import React, { useContext } from 'react'
import { DocsContext } from '@/components/docs/Context'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { DocsMenu } from '@/components/docs/Menu'

export function FloatMenu() {
  const { onClose } = useContext(DocsContext)

  return (
    <div
      className="fixed inset-0 z-[200] min-h-screen w-screen overflow-y-auto lg:hidden"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="fixed inset-0 h-screen bg-black/20 backdrop-blur-sm dark:bg-primary-900/80"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xs bg-primary-100 py-6 text-base font-semibold text-primary-600 shadow-lg dark:bg-primary-800 dark:text-primary-400">
        <button
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center text-primary-400 hover:text-primary-500 dark:text-primary-600 dark:hover:text-primary-500"
          onClick={onClose}
          aria-label="Close menu"
        >
          <XMarkIcon className="h-5 w-6" />
        </button>
        <nav className="px-6">
          <DocsMenu />
        </nav>
      </div>
    </div>
  )
}
