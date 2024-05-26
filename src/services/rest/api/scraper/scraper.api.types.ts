export type FetchAndReadRobotsTypes = {
  url: string
}

export type FetchMetaTagsTypes = {
  url: string
}

export type FetchAiDomainSummaryTypes = {
  url: string
}

export type ScraperApiTypes = {
  fetchAndReadRobots: Function
  fetchMetaTags: Function
  fetchAiDomainSummary: Function
}
