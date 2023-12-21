import '@/styles/main.css'

import { Metadata, Viewport } from 'next'
import { Fira_Mono, Lato, Montserrat } from 'next/font/google'

import { Header, Providers } from './_components'

const firaMono = Fira_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-mono',
  preload: true,
})

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
  preload: true,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
})

const faviconPath = process.env.NODE_ENV === 'production' ? '/favicon' : '/favicon/dev'
export const metadata: Metadata = {
  title: {
    template: '%s - Flama',
    default: 'Flama',
  },
  description: 'Fire up your models with the flame 🔥',
  metadataBase: new URL('https://flama.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_EN',
    url: '/',
    title: 'Flama',
    description: 'Fire up your models with the flame 🔥',
    siteName: 'flama.dev',
  },
  icons: {
    icon: [
      { url: `${faviconPath}/favicon.ico`, sizes: 'any' },
      { url: `${faviconPath}/icon.svg`, type: 'image/svg+xml' },
    ],
    apple: [{ url: `${faviconPath}/apple-touch-icon.png` }],
  },
  manifest: `${faviconPath}/manifest.json`,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#E25822',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lato.variable} ${montserrat.variable} ${firaMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="msapplication-TileColor" content="#E25822" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
