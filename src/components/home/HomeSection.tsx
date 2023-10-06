import LinkButton from '@/components/LinkButton'
import React, { ReactNode } from 'react'

interface HomeSectionProps extends React.ComponentProps<'section'> {
  icon: ReactNode
  title: string
  body: string | ReactNode
  docRef?: string
  selectableList?: ReactNode
  children?: ReactNode
}

export default function HomeSection({
  icon,
  title,
  content,
  docRef,
  selectableList,
  children,
  ...props
}: HomeSectionProps) {
  return (
    <section {...props}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex h-10 w-10 flex-none overflow-hidden rounded-full p-[0.1875rem] shadow ring-1 ring-primary-900/30 dark:bg-brand-300 lg:h-16 lg:w-16">
            <div className="flex flex-1 items-center justify-center rounded-full bg-brand-500/90 p-1 text-primary-100 dark:text-primary-800 lg:p-2">
              {icon}
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-primary-700 dark:text-primary-200 lg:text-5xl">{title}</h2>
        </div>
        <div className="mt-4 max-w-3xl">{typeof content === 'string' ? <p>{content}</p> : content}</div>
        {docRef && (
          <div className="mt-8 h-8 max-w-3xl">
            <LinkButton href={docRef} text="Learn more in our Docs" rightIcon />
          </div>
        )}
        {selectableList && <div className="mt-8 max-w-xl">{selectableList}</div>}
      </div>
      <div className="mt-16 border-t border-brand-500/50 bg-gradient-to-b from-brand-500/10 py-8">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">{children}</div>
      </div>
    </section>
  )
}
