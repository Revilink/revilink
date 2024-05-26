export default () => {
  const isSahibindenDomain = (url: string) => {
    const _isSahibindenDomain = url.includes('sahibinden.com') || url.includes('shbd.io')

    return _isSahibindenDomain
  }

  const isSahibindenIlan = (url: string) => {
    const _isSahibindenIlan = /sahibinden\.com\/ilan\/[^/]+\/detay/.test(url)

    return _isSahibindenIlan
  }

  const getSahibindenIlanGecmisi = async (ilanId: string) => {
    try {
      const response = await fetch(`/detector-based/fetch-announcement-price-history?provider=sahibinden&announcementId=${ilanId}`)
      const result = await response.json()

      return {
        data: result.data,
        error: null
      }
    } catch (error) {
      console.error('Error fetching HTML data:', error)

      throw error
    }
  }

  return {
    isSahibindenDomain,
    isSahibindenIlan,
    getSahibindenIlanGecmisi
  }
}
