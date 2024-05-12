const { withoutTrailingSlash, withProtocol } = require('ufo')

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
  let _url = url

  // If url is a domain
  if (!_url.includes('://')) {
    _url = withProtocol(_url, 'http://')
  }

  // If url starts with https convert to http
  if (_url.startsWith('https://')) {
    _url = withProtocol(removeProtocolAndWWW(_url), 'http://')
  }

  // If url starts with http://www. or https://www. convert to http://
  if (_url.startsWith('http://www.') || _url.startsWith('https://www.')) {
    _url = withProtocol(removeProtocolAndWWW(_url), 'http://')
  }

  // Apply unecessary params and trailing slash cleaner
  _url = cleanDirtyParams({ url: _url })
  _url = removeTrailingSlash(_url)

  return _url
}
