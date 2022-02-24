import Menu from '@/components/Menu'
import { useRouter } from 'next/router'
import React from 'react'
import { Hero } from '@/components/home/Hero'
import { DeployModels } from '@/components/home/DeployModels'

function Construction() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
        <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <section className="text-center">
            <h1>
              <span className="text-4xl">🔥 = 👨‍💻 + 🤖</span>
            </h1>
          </section>
        </main>
      </div>
    </>
  )
}

export default function Home() {
  const { query } = useRouter()

  if (query.dev === undefined) return <Construction />

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
        <header>
          <section className="mx-auto border-b border-brand-500 px-6 py-6 md:px-8 md:py-8">
            <Menu />
          </section>
          <section className="mx-auto max-w-5xl px-6 pt-28 text-center md:px-8 md:pt-32 lg:pt-48">
            <Hero />
          </section>
        </header>
        <main className="mx-auto mb-20 max-w-7xl space-y-20 overflow-hidden pt-20 sm:mb-32 sm:space-y-32 sm:pt-32 md:mb-40 md:space-y-40 md:pt-40">
          <DeployModels />
        </main>
      </div>
    </>
  )
}
