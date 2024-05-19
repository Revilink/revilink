import { UserTypes, AvatarTypes } from '@/types'

type CallbackParamsTypes = {
  access_token: string
  id_token: string
}

type GoogleResponseTypes = {
  jwt: string
  user: any
}

export type SetGoogleUserTypes = (params: { callbackParams: CallbackParamsTypes; googleResponse: GoogleResponseTypes }) => Promise<void>
export type GetAvatarTypes = (params: { user: UserTypes }) => AvatarTypes
export type GetAvatarSrcTypes = (params: { user: UserTypes }) => string
