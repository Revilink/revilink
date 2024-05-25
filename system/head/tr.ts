export const titleTemplate = (titleChunk: string) => {
  return titleChunk
    ? `${titleChunk} - Revilink - İnternetteki her hangi bir link hakkında yorum yap`
    : 'Revilink - İnternetteki her hangi bir link hakkında yorum yap'
}

export const title = 'Revilink - İnternetteki her hangi bir link hakkında yorum yap'

export const meta = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
  },
  {
    hid: 'robots',
    name: 'robots',
    content: 'index,follow'
  },
  {
    hid: 'description',
    name: 'description',
    content: 'İnternetteki her hangi bir link hakkında yorum yap'
  },
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes'
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website'
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: 'Revilink ― İnternetteki her hangi bir link hakkında yorum yap'
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: 'Revilink ― İnternetteki her hangi bir link hakkında yorum yap'
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://revilink.io'
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: '/meta/preview/og-main.png'
  },
  {
    hid: 'twitter:card',
    property: 'twitter:card',
    content: 'summary_large_image'
  },
  {
    hid: 'twitter:title',
    property: 'twitter:title',
    content: 'Revilink ― İnternetteki her hangi bir link hakkında yorum yap'
  },
  {
    hid: 'twitter:description',
    property: 'twitter:description',
    content: 'Revilink ― İnternetteki her hangi bir link hakkında yorum yap'
  },
  {
    hid: 'twitter:url',
    property: 'twitter:url',
    content: 'https://revilink.io'
  },
  {
    hid: 'twitter:image',
    property: 'twitter:image',
    content: '/meta/preview/og-main.png'
  },
  {
    hid: 'Publisher',
    property: 'Publisher',
    content: 'selimdoyranli'
  },
  {
    hid: 'theme-color',
    name: 'theme-color',
    content: '#fff'
  },
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes'
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'black-translucent'
  },
  { name: 'Rating', content: 'General' },
  { name: 'Distribution', content: 'Global' },
  { name: 'Copyright', content: 'Revilink' },
  { itemprop: 'copyrightYear', content: new Date().getFullYear().toString() }
]
