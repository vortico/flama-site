import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider defaultTheme="system" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
