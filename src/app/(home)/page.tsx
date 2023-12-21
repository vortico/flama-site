import React from 'react'

import { loadSample, Sample } from '@/lib/samples'

import {
  DevelopmentTools,
  EffortlessDevelopment,
  Extensibility,
  Hero,
  MachineLearningResponsive,
  ModelsLifecycle,
  ProductionReadyFirst,
} from './_components'

interface Samples {
  hero: Sample[]
  machineLearningResponsive: Sample[]
  productionReadyFirst: Sample[]
  modelsLifecycle: Sample[]
  extensibility: Sample[]
}

async function getSamples(): Promise<Samples> {
  return {
    hero: [
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
        lineNumbers: false,
      },
    ],
    machineLearningResponsive: [
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
    ],
    productionReadyFirst: [
      {
        id: 'cli',
        title: 'Command Line',
        code: await loadSample('home/production_ready_first_cli.sh'),
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
        lineNumbers: '>',
      },
    ],
    modelsLifecycle: [
      {
        id: 'models-lifecycle',
        title: 'Models Lifecycle',
        code: await loadSample('home/models_lifecycle.py'),
        language: 'python',
        lineNumbers: true,
      },
    ],
    extensibility: [
      {
        id: 'extensibility',
        title: 'Extensibility',
        code: await loadSample('home/extensibility.py'),
        language: 'python',
        lineNumbers: true,
      },
    ],
  }
}

export default async function Home() {
  const samples = await getSamples()

  return (
    <>
      <header>
        <Hero samples={samples.hero} />
      </header>
      <main className="mb-20 space-y-20 pt-20 sm:mb-32 sm:space-y-32 sm:pt-32 md:mb-40 md:space-y-40 md:pt-40">
        <MachineLearningResponsive samples={samples.machineLearningResponsive} />
        <ProductionReadyFirst samples={samples.productionReadyFirst} />
        <EffortlessDevelopment />
        <ModelsLifecycle samples={samples.modelsLifecycle} />
        <Extensibility samples={samples.extensibility} />
        <DevelopmentTools />
      </main>
    </>
  )
}
