import { encodeBase64, isBase64, decodeBase64 } from '@/utils/encode-decode'

export default (_: unknown, inject: Function) => {
  inject('encodeBase64', (value: string) => encodeBase64(value))
  inject('isBase64', (value: string) => isBase64(value))
  inject('decodeBase64', (value: string) => decodeBase64(value))
}
