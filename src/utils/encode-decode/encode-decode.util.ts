/**
 * @function encodeBase64 Encode base64
 * @param {string} value Value
 * @returns {string} Base64 encoded value
 */
export const encodeBase64 = (value: string) => {
  return Buffer.from(value, 'utf8').toString('base64')
}

/**
 * @function isBase64 Check base64
 * @param {string} value Value
 * @returns {boolean} Base64 or not
 */
export const isBase64 = (value: string) => {
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

  return base64Regex.test(value)
}

/**
 * @function decodeBase64 Decode base64
 * @param {string} value Value
 * @returns {string} Base64 decoded value
 */
export const decodeBase64 = (value: string) => {
  return Buffer.from(value, 'base64').toString('utf8')
}
