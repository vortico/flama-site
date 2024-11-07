import React from 'react'

export default function HeaderLink({ href }: React.ComponentProps<'a'>) {
  return (
    <a
      href={href}
      className="absolute -ml-8 flex items-center border-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      aria-label="Anchor"
      aria-hidden="true"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-400 shadow-sm ring-1 ring-primary-900/20 hover:text-primary-700 hover:shadow hover:ring-primary-900/50 dark:bg-primary-700 dark:text-primary-300 dark:shadow-none dark:ring-0">
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </div>
    </a>
  )
}
