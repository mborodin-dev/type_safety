import { createPalette } from '../src/createPalette'
import { createTone } from '../src/createTone'
import { InputModel, ColorData } from '../src/types'

const input: InputModel = {
  red: {
    main: 'red',
    dark: 'darkred',
    light: 'lightred',
    extra: 'extrared',
  },
  blue: {
    main: 'blue',
    dark: 'darkblue',
    light: 'lightblue',
    extra: 'extrablue',
  },
  green: {
    main: 'green',
    dark: 'darkblue',
    light: 'lightblue',
    extra: 'extrablue',
  },
  yellow: {
    main: 'yellow',
    dark: 'darkblue',
    light: 'lightblue',
    extra: 'extrablue',
  },
}

const base = (data: ColorData) => ({
  background: data.main,
  color: data.main,
})

const brightness = createTone(
  (data) => ({
    foreground: data.main,
    customProp: '#f0f0f0',
  }),
  {
    name: 'brightness',
    subtone: {
      low: (data) => ({ white: data.light }),
      high: (data) => ({ intensive: data.extra }),
    },
  }
)

describe('createPalette', () => {
  it('returns base palette only', () => {
    const palette = createPalette(input)
    expect(palette.red).toMatchObject(input.red)
    expect(palette.blue).toMatchObject(input.blue)
    expect(palette.green).toMatchObject(input.green)
    expect(palette.yellow).toMatchObject(input.yellow)
  })

  it('includes base tone properties', () => {
    const palette = createPalette(input, { base })
    expect(palette.red).toMatchObject({ ...input.red, background: 'red', color: 'red' })
    expect(palette.green).toMatchObject({ ...input.green, background: 'green', color: 'green' })
  })

  it('includes tone entries', () => {
    const palette = createPalette(input, { tones: { brightness } })

    expect(palette.red_brightness).toEqual({ foreground: 'red', customProp: '#f0f0f0' })
    expect(palette.blue_brightness).toEqual({ foreground: 'blue', customProp: '#f0f0f0' })
    expect(palette.green_brightness).toEqual({ foreground: 'green', customProp: '#f0f0f0' })
    expect(palette.yellow_brightness).toEqual({ foreground: 'yellow', customProp: '#f0f0f0' })
  })

  it('includes subtone entries', () => {
    const palette = createPalette(input, { tones: { brightness } })

    expect(palette.red_low_brightness).toEqual({ white: 'lightred' })
    expect(palette.red_high_brightness).toEqual({ intensive: 'extrared' })

    expect(palette.green_low_brightness).toEqual({ white: 'lightblue' })
    expect(palette.green_high_brightness).toEqual({ intensive: 'extrablue' })

    expect(palette.yellow_low_brightness).toEqual({ white: 'lightblue' })
    expect(palette.yellow_high_brightness).toEqual({ intensive: 'extrablue' })
  })
})
