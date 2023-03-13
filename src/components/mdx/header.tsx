import React from 'react'

function HeaderLink({ href }: React.ComponentProps<'a'>) {
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

export function H1({ id, children, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      id={id}
      className="group -ml-8 mb-4 mt-10 flex items-center whitespace-pre-wrap pl-8 text-3xl font-bold tracking-tight text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h1>
  )
}

export function H2({ id, children, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      id={id}
      className="group -ml-8 mb-4 mt-10 flex items-center whitespace-pre-wrap pl-8 text-2xl font-bold tracking-tight text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h2>
  )
}

export function H3({ id, children, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      {...props}
      id={id}
      className="group -ml-8 mb-3 mt-10 flex items-center whitespace-pre-wrap pl-8 text-xl font-bold tracking-tight text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h3>
  )
}

export function H4({ id, children, ...props }: React.ComponentProps<'h4'>) {
  return (
    <h4
      {...props}
      id={id}
      className="group -ml-8 mt-8 mb-2 flex items-center whitespace-pre-wrap pl-8 text-lg font-semibold text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h4>
  )
}

export function H5({ id, children, ...props }: React.ComponentProps<'h5'>) {
  return (
    <h5
      {...props}
      id={id}
      className="group -ml-8 mt-8 mb-2 flex items-center whitespace-pre-wrap pl-8 text-base font-semibold text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h5>
  )
}

export function H6({ id, children, ...props }: React.ComponentProps<'h6'>) {
  return (
    <h6
      {...props}
      id={id}
      className="group -ml-8 mt-8 mb-2 flex items-center whitespace-pre-wrap pl-8 text-sm font-semibold text-primary-700 dark:text-primary-200"
    >
      <HeaderLink href={`#${id}`} />
      {children}
    </h6>
  )
}
