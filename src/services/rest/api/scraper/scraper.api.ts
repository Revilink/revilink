import { ScraperApiTypes, FetchAndReadRobotsTypes, FetchMetaTagsTypes } from './scraper.api.types'
import { AppAxiosType } from '@/services/rest/core/core.types'
const DOMParser = require('universal-dom-parser')
const { getMetadata } = require('page-metadata-parser')

export const scraperApi = (appAxios: Function) =>
  <ScraperApiTypes>{
    async fetchAndReadRobots({ url }: FetchAndReadRobotsTypes) {
      const { data } = await appAxios(<AppAxiosType>{
        method: 'get',
        url: `${window.location.origin}/site-robots-checker`,
        query: {
          url
        },
        headers: {
          'User-Agent': 'RevilinkBot'
        }
      })

      if (data) {
        return data
      }
    },

    async fetchMetaTags({ url }: FetchMetaTagsTypes) {
      const { data } = await appAxios(<AppAxiosType>{
        method: 'get',
        url: `${window.location.origin}/site-scraper`,
        query: {
          url
        },
        headers: {
          'User-Agent': 'RevilinkBot'
        }
      })

      if (data) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(data, 'text/html')

        const metadata = getMetadata(doc, url)

        return metadata
      }
    }
  }
