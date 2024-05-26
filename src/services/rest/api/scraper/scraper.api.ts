import { NuxtAppOptions } from '@nuxt/types'
import { ScraperApiTypes, FetchAndReadRobotsTypes, FetchMetaTagsTypes, FetchAiDomainSummaryTypes } from './scraper.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'
const DOMParser = require('universal-dom-parser')
const { getMetadata } = require('page-metadata-parser')

export const scraperApi = (appAxios: Function, app: NuxtAppOptions) =>
  <ScraperApiTypes>{
    async fetchAndReadRobots({ url }: FetchAndReadRobotsTypes) {
      const { data } = await appAxios(<AppAxiosType>{
        method: 'get',
        url: `${window.location.origin}/link-robots-checker`,
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

      const _url = url

      const { data } = await appAxios(<AppAxiosType>{
        method: 'get',
        url: `${window.location.origin}/link-scraper`,
        query: {
          url: _url
        }
      })

      if (data) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(data, 'text/html')

        const metadata = getMetadata(doc, _url)

        return metadata
      }
    },

    async fetchAiDomainSummary(params: FetchAiDomainSummaryTypes) {
      const { url } = params

      const domain = url

      const { data, error } = await appAxios(<AppAxiosType>{
        method: 'get',
        url: `${window.location.origin}/ai-domain-summary`,
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
