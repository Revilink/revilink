import { maxLength } from '@vuelidate/validators'
import { registerValidator } from '@/validator'

export default {
  username: {
    ...registerValidator.username
  },
  information: {
    fullname: {
      maxLength: maxLength(120)
    }
  }
}
