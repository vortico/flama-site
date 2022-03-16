const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
module.exports = withContentlayer()({
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started/installation',
        permanent: true,
      },
    ]
  },
})
