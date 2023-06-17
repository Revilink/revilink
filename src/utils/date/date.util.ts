import { format } from 'date-fns'
import { tr, enUS } from 'date-fns/locale'
import { FormatToFullDateTypes } from './date.util.types'

/**
 * @function formatToFullDate Unformatted date to full human date
 * @param {date} date Date
 * @param {string} locale Locale
 * @returns {string} Formatted date
 */
export const formatToFullDate = (params: FormatToFullDateTypes) => {
  const { date, locale } = params

  if (locale === 'tr') {
    return format(date, `HH:mm '·' dd MMM yyyy`, { locale: tr })
  } else {
    return format(date, `h:mm aa '·' MMM dd, yyyy`, { locale: enUS })
  }
}
