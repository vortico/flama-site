const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-prism')],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
module.exports = withContentlayer()(
  withMDX({
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
