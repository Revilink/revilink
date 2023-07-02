/**
 * @function encodeBase64 Encode base64
 * @param {string} value Value
 * @returns {string} Base64 encoded value
 */
export const encodeBase64 = (value: string) => {
  return Buffer.from(value, 'utf8').toString('base64')
}

/**
 * @function encodeBase64 Decode base64
 * @param {string} value Value
 * @returns {string} Base64 decoded value
 */
export const decodeBase64 = (value: string) => {
  return Buffer.from(value, 'base64').toString('utf8')
}
