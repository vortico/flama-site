import '@/styles/main.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import SEO from '@/next-seo.config'
import { ThemeProvider } from 'next-themes'
import { SearchProvider } from '@/components/Search'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <SearchProvider>
        <ThemeProvider defaultTheme="system" attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SearchProvider>
    </>
  )
}
