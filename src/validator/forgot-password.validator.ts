import { required, email, minLength, maxLength } from '@vuelidate/validators'

export default {
  email: {
    required,
    email,
    minLength: minLength(5),
    maxLength: maxLength(320)
  }
}
