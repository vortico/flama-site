import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks' // eslint-disable-line import/no-unresolved
import Label from '@/components/Label'
import FlamaName from '@/components/FlamaName'
import PythonName from '@/components/PythonName'
import Link from '@/components/Link'
import { H1, H2, H3, H4, H5, H6 } from '@/components/mdx/header'
import { Code, Pre } from '@/components/mdx/code'
import { ComponentType } from 'react'
import Image from 'next/image'

export interface MDXComponentProps {
  code: string
  components: Record<string, ComponentType>
}

const defaultComponents = {
  Image,
  Label,
  FlamaName,
  PythonName,
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  code: Code,
}

export default function MDXComponent({ code, components }: MDXComponentProps) {
  useLiveReload()
  const Component = useMDXComponent(code)

  return <Component components={{ ...defaultComponents, ...components }} />
}
