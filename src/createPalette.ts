import { ColorData, InputModel, Tone, PaletteResult } from './types'

export function createPalette<
  T extends InputModel,
  Tones extends Record<string, Tone> | undefined = undefined,
  Base extends ((data: ColorData) => Record<string, string>) | undefined = undefined
>(
  input: T,
  config?: {
    base?: Base
    tones?: Tones
  }
): PaletteResult<T, Tones, Base> {
  const baseResult = {} as Record<string, unknown>
  const toneResult = {} as Record<string, unknown>
  const subtoneResult = {} as Record<string, unknown>

  for (const colorKey of Object.keys(input) as (keyof T)[]) {
    const key = colorKey as string
    const colorData = input[colorKey] as ColorData

    baseResult[key] = {
      ...colorData,
      ...(config?.base?.(colorData) ?? {}),
    }

    if (config?.tones) {
      for (const tone of Object.values(config.tones)) {
        const toneName = tone.name
        const toneKey = `${key}_${toneName}`
        toneResult[toneKey] = tone.handler(colorData)

        if (tone.subtone) {
          for (const [subtoneKey, subtoneFn] of Object.entries(tone.subtone)) {
            const subtoneFullKey = `${key}_${subtoneKey}_${toneName}`
            subtoneResult[subtoneFullKey] = subtoneFn(colorData)
          }
        }
      }
    }
  }

  return {
    ...baseResult,
    ...toneResult,
    ...subtoneResult,
  } as PaletteResult<T, Tones, Base>
}
