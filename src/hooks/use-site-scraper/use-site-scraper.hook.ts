import { useContext, reactive } from '@nuxtjs/composition-api'
import type { SiteTypes } from './use-site-scraper.hook.types'
import { useLinkDetector } from '@/hooks'

export default () => {
  const context = useContext()
  const { getLinkMeta } = useLinkDetector()

  // Website
  const site: SiteTypes = reactive({
    isAllowed: false,
    isInDetector: false,
    isBusy: false,
    meta: {}
  })

  const extractSiteMeta = async ({ url }: { url: string }) => {
    site.isBusy = true

    const robotsResult = await context.$api.rest.scraper.fetchAndReadRobots({ url })

    site.isAllowed = robotsResult.isAllowed

    const linkMeta = await getLinkMeta(url)

    if (linkMeta) {
      site.isInDetector = true
      site.meta = linkMeta
    } else if (robotsResult.isAllowed) {
      site.meta = await context.$api.rest.scraper.fetchMetaTags({
        url
      })
    }

    site.isBusy = false
  }

  return {
    site,
    extractSiteMeta
  }
}
