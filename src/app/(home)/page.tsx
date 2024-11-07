import React from 'react'

import { Code } from '@/components/elements'
import { loadSample, type ISample } from '@/lib/samples'

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
  hero: ISample[]
  machineLearningResponsive: ISample[]
  productionReadyFirst: ISample[]
  modelsLifecycle: ISample[]
  extensibility: ISample[]
}

async function getSamples(): Promise<Samples> {
  return {
    hero: [
      {
        id: 'framework',
        title: 'Framework',
        code: <Code code={await loadSample('home/hero_framework.py')} language="python" lines={{ type: 'number' }} />,
      },
      {
        id: 'application',
        title: 'Application',
        code: (
          <Code
            code={await loadSample('home/hero_application.sh')}
            language="console"
            lines={{ type: 'token', token: '>' }}
          />
        ),
      },
    ],
    machineLearningResponsive: [
      {
        id: 'tf',
        title: 'TensorFlow',
        code: (
          <Code
            code={await loadSample('home/ml_responsive_tensorflow.py')}
            language="python"
            lines={{ type: 'number' }}
          />
        ),
      },
      {
        id: 'sklearn',
        title: 'Scikit Learn',
        code: (
          <Code code={await loadSample('home/ml_responsive_sklearn.py')} language="python" lines={{ type: 'number' }} />
        ),
      },
      {
        id: 'pytorch',
        title: 'PyTorch',
        code: (
          <Code code={await loadSample('home/ml_responsive_pytorch.py')} language="python" lines={{ type: 'number' }} />
        ),
      },
    ],
    productionReadyFirst: [
      {
        id: 'cli',
        title: 'Command Line',
        code: (
          <Code
            code={await loadSample('home/production_ready_first_cli.sh')}
            language="console"
            lines={{ type: 'token', token: '>' }}
          />
        ),
      },
      {
        id: 'python',
        title: 'Python',
        code: (
          <Code
            code={await loadSample('home/production_ready_first_python.py')}
            language="python"
            lines={{ type: 'number' }}
          />
        ),
      },
      {
        id: 'docker',
        title: 'Docker',
        code: (
          <Code
            code={await loadSample('home/production_ready_first_docker.sh')}
            language="console"
            lines={{ type: 'token', token: '>' }}
          />
        ),
      },
    ],
    modelsLifecycle: [
      {
        id: 'models-lifecycle',
        title: 'Models Lifecycle',
        code: <Code code={await loadSample('home/models_lifecycle.py')} language="python" lines={{ type: 'number' }} />,
      },
    ],
    extensibility: [
      {
        id: 'extensibility',
        title: 'Extensibility',
        code: <Code code={await loadSample('home/extensibility.py')} language="python" lines={{ type: 'number' }} />,
      },
    ],
  }
}

export default async function Page() {
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
