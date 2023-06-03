export type RegisterTypes = {
  email: string
  username: string
  password: string | number
  avatar: File | null
}

export type AuthApiTypes = {
  register: Function
  fetchMe: Function
}
