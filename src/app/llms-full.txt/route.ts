import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export async function GET() {
  const source = await fs.readFile(path.join(process.cwd(), 'public', 'skill.md'), 'utf-8')

  return new Response(source, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
