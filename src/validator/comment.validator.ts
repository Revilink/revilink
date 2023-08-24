import { required, maxLength } from '@vuelidate/validators'

export default {
  content: {
    required,
    maxLength: maxLength(512)
  }
}
