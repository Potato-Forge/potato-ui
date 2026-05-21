import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { presetIcons } from 'unocss'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

export function createPfIconsPreset() {
  return presetIcons({
    collections: {
      pf: {
        logo: () => fs.readFileSync(path.resolve(currentDir, '../../assets/potato-forge.svg'), 'utf-8'),
      } as any,
    },
    extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
    scale: 1.2,
  })
}
