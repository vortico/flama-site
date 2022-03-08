import { ReactNode, useEffect } from 'react'

interface TOCItem {
  active: boolean
  anchor: HTMLAnchorElement
  section: HTMLElement
  children?: TOCItem[]
}

function getItemFromAnchor(
  anchor: HTMLAnchorElement,
  children?: TOCItem[]
): TOCItem {
  return {
    active: false,
    anchor: anchor,
    section: document.querySelector<HTMLAnchorElement>(`${anchor.hash}`)! // eslint-disable-line @typescript-eslint/no-non-null-assertion
      .parentElement!,
    children,
  }
}

function getTOC() {
  return Array.from(
    document.querySelectorAll<HTMLAnchorElement>(
      'nav.prose-toc > a, nav.prose-toc > ol > li > a.prose-toc-link'
    )
  ).map((firstLevel) =>
    getItemFromAnchor(
      firstLevel,
      Array.from(
        firstLevel.parentElement?.querySelectorAll<HTMLAnchorElement>(
          ':scope > ol > li > a.prose-toc-link'
        ) || []
      ).map((secondLevel) => getItemFromAnchor(secondLevel))
    )
  )
}

interface TOCProps {
  children: ReactNode
}

interface withTOCProps {
  title: string
  titleSlug?: string
  activeClassNames: string
}

export function withTOC({ title, titleSlug, activeClassNames }: withTOCProps) {
  function setItemActive(element: HTMLElement) {
    if (!element.classList.contains(activeClassNames))
      element.classList.add(activeClassNames)
  }

  function setItemInactive(element: HTMLElement) {
    if (element.classList.contains(activeClassNames))
      element.classList.remove(activeClassNames)
  }

  function TOC({ children, ...props }: TOCProps) {
    useEffect(() => {
      const toc = getTOC()

      const observer = new IntersectionObserver(
        (entries) => {
          toc.forEach((firstLevel) => {
            const entry = entries.find(
              ({ target }) => target === firstLevel.section
            )
            firstLevel.active = entry ? entry.isIntersecting : firstLevel.active
            firstLevel.children?.forEach((secondLevel) => {
              const entry = entries.find(
                ({ target }) => target === secondLevel.section
              )
              secondLevel.active = entry
                ? entry.isIntersecting
                : secondLevel.active
            })
          })

          const firstLevelActive = toc.find((entry) => entry.active)
          const secondLevelActive = firstLevelActive?.children?.find(
            (entry) => entry.active
          )

          // Set all entries as active/inactive
          toc.forEach((firstLevel) => {
            firstLevel === firstLevelActive
              ? setItemActive(firstLevel.anchor)
              : setItemInactive(firstLevel.anchor)
            firstLevel.children?.forEach((secondLevel) => {
              secondLevel === secondLevelActive
                ? setItemActive(secondLevel.anchor)
                : setItemInactive(secondLevel.anchor)
            })
          })
        },
        { rootMargin: '-60px 0px 0px 0px' }
      )

      // Register all entries
      toc.forEach((firstLevel) => {
        observer.observe(firstLevel.section)
        firstLevel.children?.forEach((secondLevel) => {
          observer.observe(secondLevel.section)
        })
      })

      return () => observer.disconnect()
    }, [])

    return (
      <nav
        {...props}
        className="prose-toc fixed top-20 bottom-0 right-[max(0px,calc(50%-45rem))] z-20 hidden w-[19.5rem] overflow-y-auto px-8 xl:block"
      >
        <h5 className="mb-4 mt-8 text-sm font-semibold text-primary-900 dark:text-primary-100">
          On this page
        </h5>
        {titleSlug && (
          <a className="prose-toc-link" href={`#${titleSlug}`}>
            {title}
          </a>
        )}
        {children}
      </nav>
    )
  }

  return TOC
}
