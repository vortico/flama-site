import fs from 'fs'
import { useRouter } from 'next/router'
import React from 'react'
import { Hero, Sample } from '@/components/home/Hero'
import { DeployModels } from '@/components/home/DeployModels'
import PlainLayout from '@/layouts/plain'
import Footer from '@/components/Footer'

export async function getStaticProps() {
  const heroSamples = [
    {
      title: 'As Framework',
      code: {
        code: (await fs.promises.readFile('src/samples/home/as_framework.py'))
          .toString()
          .trim(),
        language: 'python',
        lineNumbers: true,
      },
    },
    {
      title: 'As Application',
      code: {
        code: fs
          .readFileSync('src/samples/home/as_application.sh')
          .toString()
          .trim(),
        language: 'bash',
        lineNumbers: '>',
      },
    },
  ]

  return {
    props: { heroSamples },
  }
}

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

interface HomeProps {
  heroSamples: Sample[]
}

export default function Home({ heroSamples }: HomeProps) {
  const { query } = useRouter()

  return (
    <PlainLayout>
      {query.dev === undefined ? (
        <Construction />
      ) : (
        <>
          <header>
            <Hero samples={heroSamples} />
          </header>
          <main className="mb-20 space-y-20 pt-20 sm:mb-32 sm:space-y-32 sm:pt-32 md:mb-40 md:space-y-40 md:pt-40">
            <DeployModels />
          </main>
          <Footer />
        </>
      )}
    </PlainLayout>
  )
}
