import { withProtocol, withoutTrailingSlash } from 'ufo'

/**
 * @function removeProtocolAndWWW Remove protocol and www for url
 * @param {string} url Url
 * @returns {string} Stripped url
 */
export const removeProtocolAndWWW = (url: string) => {
  return url.replace(/^(https?:\/\/)?(www\.)?/, '')
}

/**
 * @function removeTrailingSlash Remove trailing slash from url
 * @param {string} url Url
 * @returns {string} Stripped url
 */
export const removeTrailingSlash = (url: string) => {
  const _url = decodeURIComponent(url)

  return withoutTrailingSlash(_url, true).replace(/\/+$/, '')
}

/**
 * @function cleanDirtyParams Clean unnecessary params on url
 * @param {string} url Url
 * @returns {string} Clean url
 */
export const cleanDirtyParams = ({ url }: { url: string }) => {
  const dirtyExactParams = ['ref']
  const dirtyPrefixesParams = ['utm_']

  const urlObj = new URL(url)

  const queries = urlObj.searchParams

  dirtyExactParams.forEach(query => {
    queries.delete(query)
  })

  dirtyPrefixesParams.forEach(prefix => {
    for (const pair of queries.entries()) {
      if (pair[0].startsWith(prefix)) {
        queries.delete(pair[0])
      }
    }
  })

  urlObj.search = queries.toString()

  return urlObj.toString()
}

/**
 * @function convertToRevilinkFormat Convert a url string to Revilink format
 * @param {string} url Url
 * @returns {string} Stripped url
 */
export const convertToRevilinkFormat = ({ url }: { url: string }) => {
  return removeProtocolAndWWW(
    removeTrailingSlash(
      cleanDirtyParams({
        url: withProtocol(url, 'http://')
      })
    )
  )
}
