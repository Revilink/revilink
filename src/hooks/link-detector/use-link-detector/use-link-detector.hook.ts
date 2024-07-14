import { useSahibindenLinkDetector, useTwitterLinkDetector } from '../detectors'

const generateTitleBySlug = (slug: string) => {
  const words = slug.split('-')
  const title = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return title
}

export default () => {
  const { isSahibindenDomain, isSahibindenIlan } = useSahibindenLinkDetector()
  const { isTwitterDomain, isXDomain } = useTwitterLinkDetector()

  const getLinkMeta = async (url: string) => {
    if (isSahibindenIlan(url)) {
      const slug = url.split('/ilan/')[1].split('/detay')[0].replace(/-\d+$/, '')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ilanId = url
        .split('/ilan/')[1]
        .split('/detay')[0]
        .match(/-(\d+)$/)?.[1]

      return await {
        title: generateTitleBySlug(slug),
        icon: 'https://www.google.com/s2/favicons?domain=sahibinden.com',
        widget: {
          announcementPriceHistory: null
        }
      }
    }

    if (isSahibindenDomain(url)) {
      return {
        title: `sahibinden.com - Türkiye'nin Online İlan ve Alışveriş Sitesi`,
        icon: 'https://www.google.com/s2/favicons?domain=sahibinden.com'
      }
    }

    if (isTwitterDomain(url) || isXDomain(url)) {
      return {
        title: 'X',
        icon: 'https://www.google.com/s2/favicons?domain=x.com'
      }
    }
  }

  return {
    getLinkMeta
  }
}
