/**
 *
 * Custom error handling approach for $api
 *
 */

import type { SetFetchErrorTypes, GetFetchErrorTypes } from './fetch-error.util.types'

export const setFetchError: SetFetchErrorTypes = error => {
  throw new Error(JSON.stringify(error))
}

export const getFetchError: GetFetchErrorTypes = error => {
  return JSON.parse(error.message)
}
