import { SearchProvider } from '@/components/Search'
import SEO from '@/next-seo.config'
import '@/styles/main.css'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <SearchProvider>
        <ThemeProvider defaultTheme="system" attribute="class" disableTransitionOnChange>
          <Component {...pageProps} />
        </ThemeProvider>
      </SearchProvider>
    </>
  )
}
