import { useRouter } from 'next/router'
import React from 'react'
import { Hero } from '@/components/home/Hero'
import { DeployModels } from '@/components/home/DeployModels'
import BaseLayout from '@/layouts/base'

function Construction() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-primary-100 text-primary-400 dark:bg-primary-800 dark:text-primary-600">
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
    <BaseLayout>
      <header>
        <Hero />
      </header>
      <main className="space-y-20 pt-20 sm:space-y-32 sm:pt-32 md:space-y-40 md:pt-40">
        <DeployModels />
      </main>
    </BaseLayout>
  )
}
