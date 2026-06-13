import React from 'react'

import { Code } from '@/components/elements'
import { loadSample, type ISample } from '@/lib/samples'

import {
  Chatbot,
  DevelopmentTools,
  EffortlessDevelopment,
  Extensibility,
  GenerativeAIServing,
  Hero,
  ModelContextProtocol,
  ModelsOnDemand,
  PackagingModels,
  ProductionReadyFirst,
  RustCore,
} from './_components'

interface Samples {
  hero: ISample[]
  packagingModels: ISample[]
  modelsOnDemand: ISample[]
  generativeAIServing: ISample[]
  modelContextProtocol: ISample[]
  productionReadyFirst: ISample[]
  extensibility: ISample[]
}

async function getSamples(): Promise<Samples> {
  return {
    hero: [
      {
        id: 'run',
        title: 'Run a model',
        code: (
          <Code code={await loadSample('home/hero_run.sh')} language="console" lines={{ type: 'token', token: '>' }} />
        ),
      },
      {
        id: 'mcp',
        title: 'MCP server',
        code: <Code code={await loadSample('home/hero_mcp.py')} language="python" lines={{ type: 'number' }} />,
      },
      {
        id: 'rest',
        title: 'REST API',
        code: <Code code={await loadSample('home/hero_rest.py')} language="python" lines={{ type: 'number' }} />,
      },
    ],
    packagingModels: [
      {
        id: 'tf',
        title: 'TensorFlow',
        code: (
          <Code code={await loadSample('home/packaging_tensorflow.py')} language="python" lines={{ type: 'number' }} />
        ),
      },
      {
        id: 'sklearn',
        title: 'scikit-learn',
        code: (
          <Code code={await loadSample('home/packaging_sklearn.py')} language="python" lines={{ type: 'number' }} />
        ),
      },
      {
        id: 'pytorch',
        title: 'PyTorch',
        code: (
          <Code code={await loadSample('home/packaging_pytorch.py')} language="python" lines={{ type: 'number' }} />
        ),
      },
    ],
    modelsOnDemand: [
      {
        id: 'ml',
        title: 'Predictive',
        code: (
          <Code code={await loadSample('home/get_ml.sh')} language="console" lines={{ type: 'token', token: '>' }} />
        ),
      },
      {
        id: 'llm',
        title: 'Generative',
        code: (
          <Code code={await loadSample('home/get_llm.sh')} language="console" lines={{ type: 'token', token: '>' }} />
        ),
      },
    ],
    generativeAIServing: [
      {
        id: 'native',
        title: 'Native',
        code: (
          <Code
            code={await loadSample('home/llm_serving_native_cli.sh')}
            language="console"
            lines={{ type: 'token', token: '>' }}
          />
        ),
      },
      {
        id: 'openai',
        title: 'OpenAI',
        code: (
          <Code
            code={await loadSample('home/llm_serving_openai_cli.sh')}
            language="console"
            lines={{ type: 'token', token: '>' }}
          />
        ),
      },
      {
        id: 'anthropic',
        title: 'Anthropic',
        code: (
          <Code
            code={await loadSample('home/llm_serving_anthropic_cli.sh')}
            language="console"
            lines={{ type: 'token', token: '>' }}
          />
        ),
      },
      {
        id: 'ollama',
        title: 'Ollama',
        code: (
          <Code
            code={await loadSample('home/llm_serving_ollama_cli.sh')}
            language="console"
            lines={{ type: 'token', token: '>' }}
          />
        ),
      },
    ],
    modelContextProtocol: [
      {
        id: 'tool',
        title: 'Tool',
        code: <Code code={await loadSample('home/mcp_tool.py')} language="python" lines={{ type: 'number' }} />,
      },
      {
        id: 'resource',
        title: 'Resource',
        code: <Code code={await loadSample('home/mcp_resource.py')} language="python" lines={{ type: 'number' }} />,
      },
      {
        id: 'prompt',
        title: 'Prompt',
        code: <Code code={await loadSample('home/mcp_prompt.py')} language="python" lines={{ type: 'number' }} />,
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
        id: 'spec',
        title: 'Spec file',
        code: (
          <div className="space-y-2">
            <Code
              code={await loadSample('home/production_ready_first_spec.json')}
              language="json"
              lines={{ type: 'number' }}
            />
            <Code
              code={await loadSample('home/production_ready_first_spec_run.sh')}
              language="console"
              lines={{ type: 'token', token: '>' }}
            />
          </div>
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
        <PackagingModels samples={samples.packagingModels} />
        <ModelsOnDemand samples={samples.modelsOnDemand} />
        <GenerativeAIServing samples={samples.generativeAIServing} />
        <Chatbot />
        <ModelContextProtocol samples={samples.modelContextProtocol} />
        <ProductionReadyFirst samples={samples.productionReadyFirst} />
        <RustCore />
        <EffortlessDevelopment />
        <Extensibility samples={samples.extensibility} />
        <DevelopmentTools />
      </main>
    </>
  )
}
