import React from 'react'
import Hero from '@/components/home/Hero'
import MachineLearningResponsive from '@/components/home/MachineLearningResponsive'
import PlainLayout from '@/layouts/plain'
import Footer from '@/components/Footer'
import EffortlessDevelopment from '@/components/home/EffortlessDevelopment'
import ProductionReadyFirst from '@/components/home/ProductionReadyFirst'
import { loadSample, Sample } from '@/lib/samples'
import ModelsLifecycle from '@/components/home/ModelsLifecycle'
import Extensibility from '@/components/home/Extensibility'

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
      language: 'commandline',
      lineNumbers: false,
    },
  ]

  const machineLearningResponsiveSamples = [
    {
      id: 'tf',
      title: 'TensorFlow',
      code: await loadSample('home/ml_responsive_tensorflow.py'),
      language: 'python',
      lineNumbers: true,
    },
    {
      id: 'sklearn',
      title: 'Scikit Learn',
      code: await loadSample('home/ml_responsive_sklearn.py'),
      language: 'python',
      lineNumbers: true,
    },
    {
      id: 'pytorch',
      title: 'PyTorch',
      code: await loadSample('home/ml_responsive_pytorch.py'),
      language: 'python',
      lineNumbers: true,
    },
  ]

  const productionReadyFirstSamples = [
    {
      id: 'cli',
      title: 'Command Line',
      code: await loadSample('home/production_ready_first_cli.sh'),
      language: 'commandline',
      lineNumbers: false,
    },
    {
      id: 'python',
      title: 'Python',
      code: await loadSample('home/production_ready_first_python.py'),
      language: 'python',
      lineNumbers: true,
    },
    {
      id: 'docker',
      title: 'Docker',
      code: await loadSample('home/production_ready_first_docker.sh'),
      language: 'commandline',
      lineNumbers: '>',
    },
  ]

  const modelsLifecycleSamples = [
    {
      id: 'models-lifecycle',
      title: 'Models Lifecycle',
      code: await loadSample('home/models_lifecycle.py'),
      language: 'python',
      lineNumbers: true,
    },
  ]

  const extensibilitySamples = [
    {
      id: 'extensibility',
      title: 'Extensibility',
      code: await loadSample('home/extensibility.py'),
      language: 'python',
      lineNumbers: true,
    },
  ]

  return {
    props: {
      heroSamples,
      machineLearningResponsiveSamples,
      productionReadyFirstSamples,
      modelsLifecycleSamples,
      extensibilitySamples,
    },
  }
}

interface HomeProps {
  heroSamples: Sample[]
  machineLearningResponsiveSamples: Sample[]
  productionReadyFirstSamples: Sample[]
  modelsLifecycleSamples: Sample[]
  extensibilitySamples: Sample[]
}

export default function Home({
  heroSamples,
  machineLearningResponsiveSamples,
  productionReadyFirstSamples,
  modelsLifecycleSamples,
  extensibilitySamples,
}: HomeProps) {
  return (
    <PlainLayout>
      <>
        <header>
          <Hero samples={heroSamples} />
        </header>
        <main className="mb-20 space-y-20 pt-20 sm:mb-32 sm:space-y-32 sm:pt-32 md:mb-40 md:space-y-40 md:pt-40">
          <MachineLearningResponsive
            samples={machineLearningResponsiveSamples}
          />
          <ProductionReadyFirst samples={productionReadyFirstSamples} />
          <EffortlessDevelopment />
          <ModelsLifecycle samples={modelsLifecycleSamples} />
          <Extensibility samples={extensibilitySamples} />
        </main>
        <Footer />
      </>
    </PlainLayout>
  )
}
