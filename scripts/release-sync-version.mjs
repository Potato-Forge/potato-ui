import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const version = process.argv[2]

if (!version) {
  console.error('Usage: pnpm release:sync-version <version>')
  process.exit(1)
}

if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version)) {
  console.error(`Invalid version: ${version}`)
  process.exit(1)
}

const files = [
  'package.json',
  'packages/cli/package.json',
]

for (const relativePath of files) {
  const filePath = resolve(process.cwd(), relativePath)
  const raw = readFileSync(filePath, 'utf8')
  const json = JSON.parse(raw)

  json.version = version

  writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`, 'utf8')
  console.log(`Updated ${relativePath} -> ${version}`)
}
