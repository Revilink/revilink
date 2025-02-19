import { UserTypes, MediaTypes } from '@/types'

type CallbackParamsTypes = {
  access_token: string
  id_token: string
}

type GoogleResponseTypes = {
  jwt: string
  user: any
}

export type SetGoogleUserTypes = (params: { callbackParams: CallbackParamsTypes; googleResponse: GoogleResponseTypes }) => Promise<void>
export type GetAvatarTypes = (params: { user: UserTypes }) => MediaTypes
export type GetAvatarSrcTypes = (params: { user: UserTypes; corsForce?: boolean }) => string
export type IsOwnerTypes = (params: { user?: UserTypes; users?: UserTypes[] }) => boolean
