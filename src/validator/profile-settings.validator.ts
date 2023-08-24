import { maxLength } from '@vuelidate/validators'
import { registerValidator } from '@/validator'

export default {
  username: {
    ...registerValidator.username
  },
  email: {
    ...registerValidator.email
  },
  information: {
    fullname: {
      maxLength: maxLength(120)
    }
  }
}
