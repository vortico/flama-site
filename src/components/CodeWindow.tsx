import type { Language } from 'prism-react-renderer'
import CodeBlock from '@/components/CodeBlock'
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid'

export interface CodeWindowProps {
  code: string
  language: Language
  lineNumbers?: string | boolean
}

export default function CodeWindow({
  code,
  language,
  lineNumbers = true,
}: CodeWindowProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-primary-800 shadow-xl dark:bg-primary-900/70 dark:ring-1 dark:ring-inset dark:ring-white/10 dark:backdrop-blur">
      <div className="flex h-8 w-full items-center justify-end gap-x-2 rounded-t-xl border-b border-primary-500/30 px-4">
        <MinusCircleIcon className="h-4 w-4 text-primary-500" />
        <PlusCircleIcon className="h-4 w-4 text-primary-500" />
        <XCircleIcon className="h-4 w-4 text-primary-500" />
      </div>
      <div className="p-4">
        <CodeBlock code={code} language={language} lineNumbers={lineNumbers} />
      </div>
    </div>
  )
}
