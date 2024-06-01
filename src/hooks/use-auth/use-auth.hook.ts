import { useContext } from '@nuxtjs/composition-api'
import type { SetGoogleUserTypes, GetAvatarTypes, GetAvatarSrcTypes } from './use-auth.hook.types'

export default () => {
  const context = useContext()

  /**
   * Set Google user
   * @param {SetGoogleUserTypes} params
   */
  const setGoogleUser: SetGoogleUserTypes = async ({ googleResponse }) => {
    await context.$auth.setStrategy('google')
    await context.$auth.setUserToken(googleResponse.jwt)
    await context.$auth.setUser(googleResponse.user)
  }

  /**
   * Get user avatar object
   * @param {UserTypes} user
   * @returns {AvatarTypes}
   */
  const getAvatar: GetAvatarTypes = ({ user }) => {
    return user.avatar
  }

  /**
   * Get user avatar src
   * @param {UserTypes} user
   * @returns {string} Avatar url
   */
  const getAvatarSrc: GetAvatarSrcTypes = ({ user, corsForce = false }) => {
    if (corsForce) {
      return `${user?.avatar?.formats?.thumbnail?.url}?v=${new Date().getTime()}`
    }

    return `${user?.avatar?.formats?.thumbnail?.url}` || ''
  }

  /**
   * Logout user
   */
  const logout = async () => {
    await context.$auth.setStrategy('local')
    await context.$auth.setUserToken('')
    await context.$auth.setUser(null)
    await context.$auth.logout()

    await context.$cookies.remove('google_auth_callback_params')
    await context.$cookies.remove('google_auth_access_token')
    await context.$cookies.remove('google_auth_jwt_token')
  }

  return {
    setGoogleUser,
    getAvatar,
    getAvatarSrc,
    logout
  }
}
