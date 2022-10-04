const { withContentlayer } = require('next-contentlayer')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  sw: 'service-worker.js',
})

/** @type {import('next').NextConfig} */
module.exports = withPWA(
  withContentlayer({
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
)
