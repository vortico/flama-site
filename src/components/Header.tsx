import Link from 'next/link'
import { FlamaLogotype, GithubIcon } from '~/components/icons'

function Nav() {
  const entries = [{ href: '/docs', title: 'Docs' }, { href: '/blog', title: 'Blog' }]

  return (
    <nav className='pr-16 text-zinc-700 dark:text-zinc-200'>
      <ul className='flex space-x-10'>
        {entries.map(entry => (
          <li key={entry.href}>
            <Link href={entry.href}>
              <a className='hover:text-brand-500 dark:hover:text-brand-400'>{entry.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Menu() {
  return (
    <div className='max-w-8xl mx-auto px-4 sm:px-8 border-b border-brand-500'>
      <div className='flex justify-between items-center border-b-3 border-gray-100 py-6'>
        <div className='flex justify-start lg:w-1 lg:flex-1'>
          <Link href=''>
            <a>
              <span className='sr-only'>Flama home page</span>
              <FlamaLogotype className='w-28 h-6' />
            </a>
          </Link>
        </div>
        <div className='relative hidden md:flex items-center justify-between'>
          <Nav />
          <div className='flex space-x-10 items-center border-l border-brand-200 dark:border-brand-400 pl-16'>
            <a
              href='https://github.com/perdy/flama'
              className='block text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300'
            >
              <span className='sr-only'>Flama on GitHub</span>
              <GithubIcon className='w-6 h-6' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function Header() {
  return (
    <div className='relative'>
      <Menu />
    </div>
  )
}
