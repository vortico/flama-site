import Menu from '@/components/header/Menu'
import React, { ReactNode, useEffect, useState } from 'react'

interface MainHeaderProps {
  children?: ReactNode
}

export default function MainHeader({ children }: MainHeaderProps) {
  const [isOpaque, setIsOpaque] = useState<boolean>(false)

  useEffect(() => {
    const offset = 50

    function onScroll() {
      if (!isOpaque && window.scrollY > offset) {
        setIsOpaque(true)
      } else if (isOpaque && window.scrollY <= offset) {
        setIsOpaque(false)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [isOpaque])

  return (
    <header
      className={`sticky inset-x-0 top-0 z-30 mx-auto flex min-h-fit items-center border-b border-brand-500 backdrop-blur transition-colors duration-500 ${
        isOpaque
          ? 'bg-primary-100/90 supports-backdrop-blur:bg-primary-100/50 dark:bg-primary-800/80 supports-backdrop-blur:dark:bg-primary-800/50'
          : 'bg-transparent'
      }
      `}
    >
      <div className="mx-auto flex max-w-[90rem] flex-1 flex-col divide-y divide-primary-300 px-4 dark:divide-primary-700 sm:px-6 md:px-8">
        <div className="py-4 lg:py-6">
          <Menu />
        </div>
        {children && <div className="py-4 lg:hidden lg:py-6">{children}</div>}
      </div>
    </header>
  )
}
