import { required, email, minLength, maxLength } from '@vuelidate/validators'

export default {
  email: {
    required,
    email,
    maxLength: maxLength(320)
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(320)
  }
}
