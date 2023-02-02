import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

const { path } = require('@vuepress/utils')

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en-US',
  title: 'BurgBits',
  description: 'Brian Hamburg: Software Engineer, Designer, and Musician',
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
            text: 'GitHub',
            link: 'https://github.com/bhamburg/',
          },
          {
            text: 'Goodreads',
            link: 'https://www.goodreads.com/user/show/4284038-brian-hamburg',
          },
          {
            text: 'Grouvee',
            link: 'https://www.grouvee.com/user/21384-burgbits/',
          },
          {
            text: 'IGN Playlist',
            link: 'https://www.ign.com/playlist/burgbits',
          },
          {
            text: 'Instagram',
            link: 'https://www.instagram.com/burgbits/',
          },
          {
            text: 'LinkedIn',
            link: 'https://www.linkedin.com/in/brianhamburg/',
          },
          {
            text: 'MetaGamerScore',
            link: 'https://metagamerscore.com/profile/6067',
          },
          {
            text: 'PSNProfiles',
            link: 'https://psnprofiles.com/burgbits'
          },
          {
            text: 'RetroAchievements',
            link: 'https://retroachievements.org/user/bhamburg'
          },
          {
            text: 'Steam Community',
            link: 'https://steamcommunity.com/id/bhamburg/'
          },
          {
            text: 'Twitter',
            link: 'https://twitter.com/burgbits/',
          },
        ],
      },
    ],
    docsRepo: 'bhamburg/burgbits-vuepress2',
    docsDir: 'docs',
    contributors: false,
    lastUpdated: false,
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
  ]
})
