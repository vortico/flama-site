import Algolia from './algolia.config'

const SEO = {
  titleTemplate: '%s - Flama',
  defaultTitle: 'Flama',
  description: 'Fire up your API',
  canonical: 'https://flama.dev',
  openGraph: {
    type: 'website',
    locale: 'en_EN',
    url: 'https://flama.dev',
    title: 'Flama',
    description: 'Fire up your API',
    image: 'https://flama.dev/images/flama-social-preview.jpg',
    site_name: 'flama.dev',
    imageWidth: 1280,
    imageHeight: 640,
  },
  additionalLinkTags: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat&display=optional',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fira+Sans&display=optional',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fira+Mono&display=optional',
    },
    {
      rel: 'preconnect',
      href: `https://${Algolia.APP_ID}-dsn.algolia.net`,
      crossOrigin: 'true',
    },
  ],
}

export default SEO
