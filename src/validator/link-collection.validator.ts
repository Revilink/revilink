import { required, maxLength } from '@vuelidate/validators'

export default {
  title: {
    required,
    maxLength: maxLength(512)
  },
  description: {
    maxLength: maxLength(2048)
  }
}
