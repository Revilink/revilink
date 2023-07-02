import { required, email, minLength, maxLength } from '@vuelidate/validators'
import { USERNAME_REGEX } from '../../system/constants'

export default {
  email: {
    required,
    email,
    maxLength: maxLength(320)
  },
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(30),
    isValid(value: string) {
      const regex = USERNAME_REGEX
      const isValid = regex.test(value)

      return isValid
    }
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(320)
  }
}
