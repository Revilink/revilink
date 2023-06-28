import { required, minLength, maxLength } from '@vuelidate/validators'
import { registerValidator } from '@/validator'

export default {
  username: {
    ...registerValidator.username
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(320)
  }
}
