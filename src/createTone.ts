import { ToneFn, CreateToneOptions, Tone } from './types'

export const createTone = (handler: ToneFn, options?: CreateToneOptions): Tone => {
  return {
    name: options?.name ?? 'default',
    handler,
    subtone: options?.subtone,
  }
}
