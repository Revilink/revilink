export interface MediaApiModelTypes {
  id: number
  data?: Record<string, any>
  attributes?: Record<string, any>
  formats?: Record<string, any>
}

export interface MediaTypes extends MediaApiModelTypes {}
