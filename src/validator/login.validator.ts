import { required, minLength, maxLength } from '@vuelidate/validators'

export default {
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(320)
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(320)
  }
}
