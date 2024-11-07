import fs from 'fs'
import p from 'path'

export interface ISample {
  id: string
  title: string
  code: React.ReactNode
}

export async function loadSample(path: string) {
  return (await fs.promises.readFile(p.join('src/samples', path))).toString().trim()
}
