import Menu from '@/components/Menu'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { SearchButton } from '@/components/Search'
import { SearchIcon } from '@heroicons/react/outline'

function Construction() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
        <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <section className="text-center">
            <h1>
              <span className="text-4xl">🔥 = 👨‍💻 + 🤖</span>
            </h1>
          </section>
        </main>
      </div>
    </>
  )
}

function Hero() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-zinc-700 dark:text-zinc-200 sm:text-5xl lg:text-6xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h1>
      <p className="mx-auto mt-6 max-w-3xl text-lg">
        Quisque ut ultrices diam, id lobortis justo. Maecenas in pharetra dolor.
        Maecenas in pharetra dolor. Nunc vitae arcu in est euismod feugiat.
      </p>
      <div className="mt-6 flex justify-center gap-6 text-sm sm:mt-10">
        <NextLink href="/docs/">
          <a className="dark:highlight-white/20 flex h-12 w-full items-center justify-center rounded bg-brand-500 px-6 font-semibold text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-brand-50 dark:bg-brand-500 dark:hover:bg-brand-400 sm:w-auto">
            Get Started
          </a>
        </NextLink>
        <SearchButton className="dark:highlight-white/5 hidden h-12 w-72 items-center space-x-3 rounded bg-white px-4 text-left shadow-sm ring-1 ring-brand-900/10 hover:ring-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-zinc-700 dark:ring-0 dark:hover:bg-zinc-600 sm:flex">
          {({ actionKey }) => (
            <>
              <SearchIcon className="h-6 w-6 flex-none text-brand-500" />
              <span className="flex-auto">Quick search...</span>
              {actionKey && (
                <kbd className="font-sans font-semibold text-brand-500">
                  <abbr
                    title={actionKey[1]}
                    className="text-zinc-500 no-underline dark:text-zinc-400"
                  >
                    {actionKey[0]}
                  </abbr>{' '}
                  K
                </kbd>
              )}
            </>
          )}
        </SearchButton>
      </div>
    </>
  )
}

export default function Home() {
  const { query } = useRouter()

  if (query.dev === undefined) return <Construction />

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
        <header>
          <section className="mx-auto border-b border-brand-500 px-6 py-6 md:px-8 md:py-8">
            <Menu />
          </section>
          <section className="mx-auto max-w-5xl px-6 pt-20 text-center md:px-8 md:pt-24 lg:pt-32">
            <Hero />
          </section>
        </header>
      </main>
    </>
  )
}
