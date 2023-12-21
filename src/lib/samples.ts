import fs from 'fs'
import path from 'path'

import type { Language } from 'prism-react-renderer'

export interface Sample {
  id: string
  title: string
  code: string
  language?: Language
  lineNumbers?: string | boolean
}

export async function loadSample(samplePath: string) {
  return (await fs.promises.readFile(path.join('src/samples', samplePath))).toString().trim()
}
