import { parseURL, withProtocol } from 'ufo'
import { NuxtAppOptions } from '@nuxt/types'
import { ScraperApiTypes, FetchAndReadRobotsTypes, FetchMetaTagsTypes } from './scraper.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'
import { removeProtocolAndWWW } from '@/utils/url'
const DOMParser = require('universal-dom-parser')
const { getMetadata } = require('page-metadata-parser')

export const scraperApi = (appAxios: Function, app: NuxtAppOptions) =>
  <ScraperApiTypes>{
    async fetchAndReadRobots({ url }: FetchAndReadRobotsTypes) {
      const { data } = await appAxios(<AppAxiosType>{
        method: 'get',
        url: `${window.location.origin}/site-robots-checker`,
        query: {
          url
        }
      })

      if (data) {
        return data
      }
    },

    async fetchMetaTags(params: FetchMetaTagsTypes) {
      const { url } = params

      const _url = withProtocol(url, 'http://')

      const { data } = await appAxios(<AppAxiosType>{
        method: 'get',
        url: `${window.location.origin}/site-scraper`,
        query: {
          url: _url
        },
        headers: {
          'User-Agent': 'RevilinkBot'
        }
      })

      if (data) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(data, 'text/html')

        const metadata = getMetadata(doc, _url)

        return metadata
      }
    },

    async fetchSiteAiSummary(params: FetchMetaTagsTypes) {
      const { url } = params

      const { host } = parseURL(withProtocol(url, 'http://'))

      const domain = removeProtocolAndWWW(host as string)

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        url: `${window.location.origin}/site-ai-summary`,
        query: {
          domain,
          locale: app.i18n.locale
        }
      })

      if (data) {
        return {
          data: data.data
        }
      } else {
        return {
          error
        }
      }
    }
  }
