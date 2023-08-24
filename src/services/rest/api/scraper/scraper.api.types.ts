export type FetchAndReadRobotsTypes = {
  url: string
}

export type FetchMetaTagsTypes = {
  url: string
}

export type FetchSiteAiSummary = {
  url: string
}

export type ScraperApiTypes = {
  fetchAndReadRobots: Function
  fetchMetaTags: Function
  fetchSiteAiSummary: Function
}
