export interface TOCItem<T> {
  path: string
  title: string
  url: string
  order: number
  content: T
}

export interface TOCLink<T> {
  title: string
  url: string
  order: number
  content: T
}

interface GroupedTOCLink<T> extends TOCLink<T> {
  path: string
  group: string
}

export interface TOC<T> {
  links: TOCLink<T>[]
  categories: TOCCategory<T>[]
}

export interface TOCCategory<T> extends TOC<T> {
  name: string
  order: number
}

function _tableOfContent<T>(rawLinks: TOCItem<T>[], rawName: string): TOCCategory<T> {
  const nameMatch = rawName.match(/^(\d+)-(.*)/)
  const name = nameMatch?.[2] || ''
  const order = parseInt(nameMatch?.[1] || '')

  const groups = Object.entries(
    rawLinks
      .map((link) => {
        const [first, ...rest] = link.path.split('/')
        const path = rest.length !== 0 ? rest.join('/') : first
        const group = rest.length !== 0 ? first : ''
        return { ...link, path, group }
      })
      .reduce((rv: { [key: string]: GroupedTOCLink<T>[] }, x: GroupedTOCLink<T>) => {
        ;(rv[x.group] = rv[x.group] || []).push(x)
        return rv
      }, {}),
  )

  const links =
    groups
      .find(([group]) => group === '')?.[1]
      .map(({ title, path, url, order, content }) => ({
        title,
        path,
        url,
        order,
        content,
      })) || []

  const categories = groups.filter(([group]) => group).map(([group, links]) => _tableOfContent(links, group))

  return { name, links, categories, order }
}

export function tableOfContent<T>(
  rawLinks: {
    path: string
    title: string
    url: string
    order: number
    content: T
  }[],
): TOC<T> {
  const toc = _tableOfContent(rawLinks, '')
  return { categories: toc.categories, links: toc.links }
}
