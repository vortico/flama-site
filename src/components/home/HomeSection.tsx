import Link from 'next/link'
import React, { ReactNode } from 'react'

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
        <div className="ml-[0.1875rem] flex w-10 items-center justify-center overflow-hidden rounded-full p-[0.1875rem] shadow ring-1 ring-zinc-900/30 dark:bg-brand-300 lg:w-16">
          <div className="w-10 rounded-full bg-brand-500/90 p-[0.1875rem] text-zinc-100 dark:text-zinc-800 lg:w-16">
            {icon}
          </div>
        </div>
        <h2 className="text-3xl font-semibold text-zinc-700 dark:text-zinc-200 md:text-5xl">
          {title}
        </h2>
      </div>
      <p className="mt-4 max-w-3xl">{content}</p>
      {docRef && (
        <Link href={docRef}>
          <a className="dark:highlight-white/20 mt-8 inline-flex h-8 items-center rounded-full bg-brand-500 px-6 font-semibold text-zinc-100 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-brand-50 dark:bg-brand-500 dark:hover:bg-brand-400">
            Learn more
          </a>
        </Link>
      )}
      <div className="mt-8">{children}</div>
    </section>
  )
}
