import { createTone, ColorData } from '../src'

const mockColorData: ColorData = {
  main: '#ff0000',
  dark: '#cc0000',
  light: '#ff6666',
  extra: '#ff9999',
}

describe('createTone', () => {
  it('creates tone with default name', () => {
    const handler = (data: ColorData) => ({ base: data.main })
    const tone = createTone(handler)

    expect(tone.name).toBe('default')
    expect(tone.handler(mockColorData)).toEqual({ base: '#ff0000' })
  })

  it('creates tone with custom name and subtone', () => {
    const handler = (data: ColorData) => ({ contrast: data.dark })
    const subtone = {
      hover: (data: ColorData) => ({ hover: data.light }),
    }

    const tone = createTone(handler, { name: 'custom', subtone })

    expect(tone.name).toBe('custom')
    expect(tone.subtone?.hover?.(mockColorData)).toEqual({ hover: '#ff6666' })
  })
})
