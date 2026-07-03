import { type MetadataRoute } from 'next'

export const dynamic = 'force-static'

const faviconPath = process.env.NODE_ENV === 'production' ? '/favicon' : '/favicon/dev'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Flama',
    short_name: 'Flama',
    description: 'Fire up your models with the flame 🔥',
    start_url: '/',
    lang: 'en',
    dir: 'ltr',
    categories: ['developer', 'productivity'],
    theme_color: '#E25822',
    background_color: '#E25822',
    display: 'standalone',
    icons: [
      {
        src: `${faviconPath}/icon.svg`,
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: `${faviconPath}/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: `${faviconPath}/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
