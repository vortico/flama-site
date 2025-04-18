'use client'

import React, { useCallback, useEffect } from 'react'

interface TOCItem {
  active: boolean
  anchor: HTMLAnchorElement
  section: HTMLElement
  children?: TOCItem[]
}

function getItemFromAnchor(anchor: HTMLAnchorElement, children?: TOCItem[]): TOCItem {
  return {
    active: false,
    anchor: anchor,
    section: document.querySelector<HTMLAnchorElement>(`${anchor.hash}`)!.parentElement!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
    children,
  }
}

function getTOC() {
  return Array.from(
    document.querySelectorAll<HTMLAnchorElement>('nav.prose-toc > a, nav.prose-toc > ol > li > a.prose-toc-link'),
  ).map((firstLevel) =>
    getItemFromAnchor(
      firstLevel,
      Array.from(
        firstLevel.parentElement?.querySelectorAll<HTMLAnchorElement>(':scope > ol > li > a.prose-toc-link') || [],
      ).map((secondLevel) => getItemFromAnchor(secondLevel)),
    ),
  )
}

interface TOCProps extends React.ComponentProps<'nav'> {
  title: string
  titleSlug?: string
  activeClassNames: string
}

export default function TOC({ title, titleSlug, activeClassNames, children, ...props }: TOCProps) {
  const setItemActive = useCallback(
    (element: HTMLElement) => {
      if (!element.classList.contains(activeClassNames)) element.classList.add(activeClassNames)
    },
    [activeClassNames],
  )

  const setItemInactive = useCallback(
    (element: HTMLElement) => {
      if (element.classList.contains(activeClassNames)) element.classList.remove(activeClassNames)
    },
    [activeClassNames],
  )

  useEffect(() => {
    const toc = getTOC()

    const observer = new IntersectionObserver(
      (entries) => {
        toc.forEach((firstLevel) => {
          const entry = entries.find(({ target }) => target === firstLevel.section)
          firstLevel.active = entry ? entry.isIntersecting : firstLevel.active
          firstLevel.children?.forEach((secondLevel) => {
            const entry = entries.find(({ target }) => target === secondLevel.section)
            secondLevel.active = entry ? entry.isIntersecting : secondLevel.active
          })
        })

        const firstLevelActive = toc.find((entry) => entry.active)
        const secondLevelActive = firstLevelActive?.children?.find((entry) => entry.active)

        // Set all entries as active/inactive
        toc.forEach((firstLevel) => {
          firstLevel === firstLevelActive ? setItemActive(firstLevel.anchor) : setItemInactive(firstLevel.anchor)
          firstLevel.children?.forEach((secondLevel) => {
            secondLevel === secondLevelActive ? setItemActive(secondLevel.anchor) : setItemInactive(secondLevel.anchor)
          })
        })
      },
      { rootMargin: '-112px 0px 0px 0px' },
    )

    // Register all entries
    toc.forEach((firstLevel) => {
      observer.observe(firstLevel.section)
      firstLevel.children?.forEach((secondLevel) => {
        observer.observe(secondLevel.section)
      })
    })

    return () => observer.disconnect()
  }, [setItemActive, setItemInactive])

  return (
    <nav
      {...props}
      className="prose-toc fixed bottom-0 right-[max(0px,calc(50%-45rem))] top-20 z-20 hidden w-72 overflow-y-auto px-8 lg:block"
    >
      <h5 className="mb-4 mt-8 text-sm font-semibold text-primary-900 dark:text-primary-100">On this page</h5>
      {titleSlug && (
        <a className="prose-toc-link" href={`#${titleSlug}`}>
          {title}
        </a>
      )}
      {children}
    </nav>
  )
}
