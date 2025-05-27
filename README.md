# Test task on type safety

- The project was implemented as part of a test assignment for the company `"BKH Ecom"` and does not carry any commercial meaning.
- The architecture chosen is the most minimal and is applicable only to this project.

## Stack

- TypeScript, Jest

## Checking the solution

Install dependencies and run tests.

```bash
  npm install
  npm test
```

## Functional

- `createTone()` - a constructor that returns a "Tone" object. Used to define color processing logic.

```javascript
Tone {
  name: string // tone name
  handler: ToneFn // main function
  subtone?: Record<string, SubtoneFn> // optional undertones
}
```

- `createPalette(input, base?, tones)` - applies "tones" to each color. Generates an output object where the keys are combinations of conditions.
  - `input` - input color set
  - `base` - optional function for complementing colors
  - `tones` - objects from createTone()
