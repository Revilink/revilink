import { required, maxLength } from '@vuelidate/validators'

export default {
  title: {
    required,
    maxLength: maxLength(128)
  },
  description: {
    maxLength: maxLength(512)
  }
}
