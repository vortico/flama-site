import React from 'react'

import { codeToHtml, type BundledLanguage } from 'shiki'

import { theme } from '@/lib/highlighter'

function PlainCode({ code }: { code: string }) {
  return <span className="relative inline flex-auto overflow-auto whitespace-normal">{code}</span>
}

async function HighlightCode({ code, language }: { code: string; language: BundledLanguage }) {
  return (
    <span
      className="relative inline flex-auto overflow-auto whitespace-normal"
      dangerouslySetInnerHTML={{ __html: await codeToHtml(code, { lang: language, theme }) }}
    />
  )
}

export interface CodeInlineProps {
  code: string
  language?: BundledLanguage | string
}

export default function CodeInline({ code, language }: CodeInlineProps) {
  return (
    <code className="relative inline flex-auto overflow-auto whitespace-normal">
      {language ? <HighlightCode code={code} language={language as BundledLanguage} /> : <PlainCode code={code} />}
    </code>
  )
}
