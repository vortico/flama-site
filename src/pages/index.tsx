import Header from '../components/Header'
import { useRouter } from 'next/router'

function Construction() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-800">
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

export default function Home() {
  const { query } = useRouter()

  if (query.dev === undefined) return <Construction />

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Header />

        <article className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <section className="text-center">
            <h1>
              <span className="text-4xl">🔥 = 👨‍💻 + 🤖</span>
            </h1>
          </section>
        </article>
      </main>
    </>
  )
}
