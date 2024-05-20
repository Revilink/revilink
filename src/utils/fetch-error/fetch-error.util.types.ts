export type SetFetchErrorTypes = (error: Error) => void

type ErrorTypes = {
  message: string
  code: number
  config?: unknown
}

export type GetFetchErrorTypes = (error: Error) => ErrorTypes
