// import { sameAs } from '@vuelidate/validators'
import { registerValidator } from '@/validator'

export default {
  form: {
    password: {
      ...registerValidator.password
    },
    confirmPassword: {
      ...registerValidator.password
    }
  }
}
