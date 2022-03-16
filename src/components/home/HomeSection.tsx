import React, { ReactNode } from 'react'
import LinkButton from '@/components/LinkButton'

interface HomeSectionProps extends React.ComponentProps<'section'> {
  icon: ReactNode
  title: string
  content: string
  docRef?: string
  children?: ReactNode
}

export function HomeSection({
  icon,
  title,
  content,
  docRef,
  children,
  ...props
}: HomeSectionProps) {
  return (
    <section {...props}>
      <div className="flex items-center gap-4 md:gap-10">
        <div className="ml-[0.1875rem] flex w-10 items-center justify-center overflow-hidden rounded-full p-[0.1875rem] shadow ring-1 ring-primary-900/30 dark:bg-brand-300 lg:w-16">
          <div className="w-10 rounded-full bg-brand-500/90 p-[0.1875rem] text-primary-100 dark:text-primary-800 lg:w-16">
            {icon}
          </div>
        </div>
        <h2 className="text-3xl font-semibold text-primary-700 dark:text-primary-200 md:text-5xl">
          {title}
        </h2>
      </div>
      <p className="mt-4 max-w-3xl">{content}</p>
      {docRef && (
        <div className="mt-8 h-8">
          <LinkButton href={docRef} text="Read More" rightIcon />
        </div>
      )}
      <div className="mt-8">{children}</div>
    </section>
  )
}
