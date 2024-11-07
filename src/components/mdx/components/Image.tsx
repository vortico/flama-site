import React from 'react'

import NextImage from 'next/image'

export default function Image(props: React.ComponentProps<'img'>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <NextImage {...props} />
}
