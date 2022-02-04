import Image from 'next/image'
import flamaLogotype from '@app-public/images/flama-logotype.svg'
import React from 'react'

export default function FlamaLogotype({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={`relative ${className}`} {...props}>
      <Image src={flamaLogotype} alt='Flama logo' layout='fill' />
    </div>
  )
}