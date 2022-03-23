import { useRouter } from 'next/router'
import React from 'react'
import Hero from '@/components/home/Hero'
import MachineLearningResponsive from '@/components/home/MachineLearningResponsive'
import PlainLayout from '@/layouts/plain'
import Footer from '@/components/Footer'
import Effortless from '@/components/home/Effortless'
import ProductionReadyFirst from '@/components/home/ProductionReadyFirst'
import { loadSample, Sample } from '@/lib/samples'

export async function getStaticProps() {
  const heroSamples = [
    {
      id: 'framework',
      title: 'Framework',
      code: await loadSample('home/hero_framework.py'),
      language: 'python',
      lineNumbers: true,
    },
    {
      id: 'application',
      title: 'Application',
      code: await loadSample('home/hero_application.sh'),
      language: 'bash',
      lineNumbers: '>',
    },
  ]

  const effortlessSamples = [
    {
      id: 'tf',
      title: 'Tensorflow',
      code: await loadSample('home/tensorflow_application.sh'),
      language: 'bash',
      lineNumbers: '>',
    },
    {
      id: 'sklearn',
      title: 'Scikit Learn',
      code: await loadSample('home/sklearn_application.sh'),
      language: 'bash',
      lineNumbers: '>',
    },
    {
      id: 'pytorch',
      title: 'PyTorch',
      code: await loadSample('home/pytorch_application.sh'),
      language: 'bash',
      lineNumbers: '>',
    },
    {
      id: 'pycaret',
      title: 'PyCaret',
      code: await loadSample('home/pycaret_application.sh'),
      language: 'bash',
      lineNumbers: '>',
    },
  ]

  const machineLearningResponsiveSamples = [
    {
      id: 'tf',
      title: 'Tensorflow',
      code: await loadSample('home/tensorflow_framework.py'),
      language: 'python',
      lineNumbers: true,
    },
    {
      id: 'sklearn',
      title: 'Scikit Learn',
      code: await loadSample('home/sklearn_framework.py'),
      language: 'python',
      lineNumbers: true,
    },
    {
      id: 'pytorch',
      title: 'PyTorch',
      code: await loadSample('home/pytorch_framework.py'),
      language: 'python',
      lineNumbers: true,
    },
    {
      id: 'pycaret',
      title: 'PyCaret',
      code: await loadSample('home/pycaret_framework.py'),
      language: 'python',
      lineNumbers: true,
    },
  ]

  const productionReadyFirstSamples = [
    {
      id: 'cli',
      title: 'Command Line',
      code: await loadSample('home/cli.sh'),
      language: 'bash',
      lineNumbers: '>',
    },
    {
      id: 'docker',
      title: 'Docker',
      code: await loadSample('home/docker.sh'),
      language: 'bash',
      lineNumbers: '>',
    },
  ]

  return {
    props: {
      heroSamples,
      effortlessSamples,
      machineLearningResponsiveSamples,
      productionReadyFirstSamples,
    },
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
  effortlessSamples: Sample[]
  machineLearningResponsiveSamples: Sample[]
  productionReadyFirstSamples: Sample[]
}

export default function Home({
  heroSamples,
  effortlessSamples,
  machineLearningResponsiveSamples,
  productionReadyFirstSamples,
}: HomeProps) {
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
            <Effortless samples={effortlessSamples} />
            <MachineLearningResponsive
              samples={machineLearningResponsiveSamples}
            />
            <ProductionReadyFirst samples={productionReadyFirstSamples} />
          </main>
          <Footer />
        </>
      )}
    </PlainLayout>
  )
}
