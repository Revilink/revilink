import { registerValidator } from '@/validator'

export default {
  password: {
    ...registerValidator.password
  },
  confirmPassword: {
    ...registerValidator.password
  }
}
