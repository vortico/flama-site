'use client'

import React, { ReactNode } from 'react'

import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'

import Label from '@/components/Label'
import Link from '@/components/Link'
import { Code, Pre } from '@/components/mdx/code'
import { H1, H2, H3, H4, H5, H6 } from '@/components/mdx/header'
import { BosqueName, BrumaName, CiclonName, FlamaName, PythonName, VorticoName } from '@/components/names'
import { type Document } from '@/lib/mdx'

const DEFAULT_COMPONENTS = {
  Image,
  Label,
  BosqueName,
  BrumaName,
  CiclonName,
  FlamaName,
  PythonName,
  VorticoName,
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

interface MDXContentProps<D extends Document> {
  document: D
  components?: { [key: string]: (...rest: any[]) => ReactNode }
}

export default function MDXContent<D extends Document>({ document, components }: MDXContentProps<D>) {
  return <MDXRemote {...document.content} components={{ ...DEFAULT_COMPONENTS, ...components }} />
}
