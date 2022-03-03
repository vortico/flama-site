import { ReactNode } from 'react'

export function withHeader({ level }: { level: number }) {
  const CustomHeader = `h${level}` as keyof JSX.IntrinsicElements

  function Header({ children, ...props }: { children: ReactNode }) {
    return (
      <CustomHeader
        {...props}
        className="group -ml-8 flex items-center whitespace-pre-wrap pl-8"
      >
        {children}
      </CustomHeader>
    )
  }

  return Header
}
