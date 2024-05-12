import { required, maxLength } from '@vuelidate/validators'
import { URL_REGEX, URL_MAX_LENGTH } from '../../system/constants'

export default {
  url: {
    required,
    maxLength: maxLength(URL_MAX_LENGTH),
    isValid(value: string) {
      const isValid = URL_REGEX.test(value)

      return isValid
    }
  }
}
