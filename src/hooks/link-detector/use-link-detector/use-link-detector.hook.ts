import { useSahibindenLinkDetector } from '../detectors'

const generateTitleBySlug = (slug: string) => {
  const words = slug.split('-')
  const title = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return title
}

export default () => {
  const { isSahibindenDomain, isSahibindenIlan, getSahibindenIlanGecmisi } = useSahibindenLinkDetector()

  const getLinkMeta = async (url: string) => {
    if (isSahibindenIlan(url)) {
      const slug = url.split('/ilan/')[1].split('/detay')[0].replace(/-\d+$/, '')
      const ilanId = url
        .split('/ilan/')[1]
        .split('/detay')[0]
        .match(/-(\d+)$/)?.[1]

      const { data: announcementPriceHistory } = await getSahibindenIlanGecmisi(ilanId || '')

      return {
        title: generateTitleBySlug(slug),
        icon: 'https://www.google.com/s2/favicons?domain=sahibinden.com',
        widget: {
          announcementPriceHistory
        }
      }
    }

    if (isSahibindenDomain(url)) {
      return {
        title: `sahibinden.com - Türkiye'nin Online İlan ve Alışveriş Sitesi`,
        icon: 'https://www.google.com/s2/favicons?domain=sahibinden.com'
      }
    }
  }

  return {
    getLinkMeta,
    getSahibindenIlanGecmisi
  }
}
