import { required, email, minLength, maxLength } from '@vuelidate/validators'

export default {
  email: {
    required,
    email,
    maxLength: maxLength(320)
  },
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(30),
    isValid(value: boolean) {
      const regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/ as any
      const isValid = regex.test(value)

      return isValid
    }
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(320)
  }
}
