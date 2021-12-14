import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

const { path } = require('@vuepress/utils')

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en-US',
  title: 'BurgBits',
  description: 'Brian Hamburg: Web Developer, Designer, and Musician',

  themeConfig: {
    logo: '/images/burgbits-logo.svg',
    navbar: [
      {
        text: 'About',
        link: '/about/',
      },
      // {
      //   text: 'Blog',
      //   link: '/blog/',
      // },
      // {
      //   text: 'Lists',
      //   link: '/lists/',
      // },
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
    ]
  ]
})