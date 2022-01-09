import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

const { path } = require('@vuepress/utils')

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en-US',
  title: 'BurgBits',
  description: 'Brian Hamburg: Software Engineer, Designer, and Musician',
  extendsPageOptions: ({ filePath }, app) => {
    if (!filePath?.endsWith('README.md') && filePath?.startsWith(app.dir.source('blog/'))) {
        return {
            frontmatter: {
                permalinkPattern: 'blog/:year/:month/:slug.html',
                sidebar: false,
                layout: 'BlogLayout',
            },
        }
    }
    return {}
  },
  head: [
    ['script', { src: `https://www.instagram.com/embed.js` }], // for Instagram Embed
  ],
  themeConfig: {
    logo: '/images/burgbits-logo.svg',
    navbar: [
      {
        text: 'About',
        link: '/about/',
      },
      {
        text: 'Lists',
        link: '/lists/',
      },
      {
        text: 'Uses',
        link: '/uses/',
      },
      {
        text: 'Social',
        children: [
          {
            text: 'Twitter',
            link: 'https://twitter.com/burgbits/',
          },
          {
            text: 'LinkedIn',
            link: 'https://www.linkedin.com/in/brianhamburg/',
          },
          {
            text: 'GitHub',
            link: 'https://github.com/bhamburg/',
          },
          {
            text: 'CodePen',
            link: 'https://codepen.io/bhamburg/',
          },
        ],
      },
    ],
    docsRepo: 'bhamburg/burgbits-vuepress2',
    docsDir: 'docs',
    contributors: false,
  },

  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      }
    ],
    [
      '@vuepress/plugin-google-analytics',
      {
        id: 'G-30HMKNVJE0',
      },
    ],
    [
      '@vuepress/plugin-search',
    ],
  ]
})