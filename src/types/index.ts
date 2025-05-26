export type ColorsUnion = 'red' | 'green' | 'blue' | 'yellow'

export type ColorData = {
  main: string
  dark: string
  light: string
  extra: string
}

export type InputModel = Record<ColorsUnion, ColorData>

export type SubtoneFn = (data: ColorData) => Record<string, string>
export type ToneFn = (data: ColorData) => Record<string, string>

export interface CreateToneOptions {
  name?: string
  subtone?: Record<string, SubtoneFn>
}

export interface Tone {
  name: string
  handler: ToneFn
  subtone?: Record<string, SubtoneFn>
}

export type PaletteResult<
  TInput extends InputModel,
  Tones extends Record<string, Tone> | undefined,
  BaseFn extends ((data: ColorData) => Record<string, string>) | undefined
> = {
  [Color in keyof TInput]: TInput[Color] & (BaseFn extends (...args: any[]) => infer R ? R : {})
} & (Tones extends Record<string, Tone>
  ? {
      [Color in keyof TInput as `${Color & string}_${Tones[keyof Tones]['name']}`]: ReturnType<
        Tones[keyof Tones]['handler']
      >
    } & {
      [Color in keyof TInput as `${Color &
        string}_${string}_${Tones[keyof Tones]['name']}`]: Record<string, string>
    }
  : {})
