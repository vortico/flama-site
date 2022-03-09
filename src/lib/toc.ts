export interface TOCLink {
  title: string
  url: string
  order: number
}

interface GroupedTOCLink extends TOCLink {
  path: string
  group: string
}

export interface TOC {
  links: TOCLink[]
  categories: TOCCategory[]
}

export interface TOCCategory extends TOC {
  name: string
  order: number
}

function _tableOfContent(
  rawLinks: { path: string; title: string; url: string; order: number }[],
  rawName: string
): TOCCategory {
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
      .reduce((rv: { [key: string]: GroupedTOCLink[] }, x: GroupedTOCLink) => {
        ;(rv[x.group] = rv[x.group] || []).push(x)
        return rv
      }, {})
  )

  const links =
    groups
      .find(([group]) => group === '')?.[1]
      .map((link) => ({
        title: link.title,
        path: link.path,
        url: link.url,
        order: link.order,
      })) || []

  const categories = groups
    .filter(([group]) => group)
    .map(([group, links]) => _tableOfContent(links, group))

  return { name, links, categories, order }
}

export function tableOfContent(
  rawLinks: { path: string; title: string; url: string; order: number }[]
): TOC {
  const toc = _tableOfContent(rawLinks, '')
  return { categories: toc.categories, links: toc.links }
}
