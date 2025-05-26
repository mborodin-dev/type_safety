import { ToneFn, CreateToneOptions, Tone } from './types'

export default function createTone(handler: ToneFn, options?: CreateToneOptions): Tone {
  return {
    name: options?.name ?? 'default',
    handler,
    subtone: options?.subtone,
  }
}
