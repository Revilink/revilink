import type { MediaApiModelTypes } from '@/types'

export default (model: MediaApiModelTypes) => {
  return model
    ? {
        ...(model.attributes || model),
        id: model.id
      }
    : null
}
