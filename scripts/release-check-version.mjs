import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const expectedFromArg = process.argv[2]
const expectedFromEnv = process.env.GITHUB_REF_NAME?.replace(/^v/, '')
const expectedVersion = expectedFromArg || expectedFromEnv

const readJson = (relativePath) => {
  const filePath = resolve(process.cwd(), relativePath)
  return JSON.parse(readFileSync(filePath, 'utf8'))
}

const rootPkg = readJson('package.json')
const cliPkg = readJson('packages/cli/package.json')

const rootVersion = rootPkg.version
const cliVersion = cliPkg.version
const cliName = cliPkg.name

const errors = []

if (cliName !== '@potato-forge/cli') {
  errors.push(`CLI package name must be @potato-forge/cli, got ${cliName}`)
}

if (rootVersion !== cliVersion) {
  errors.push(`Version mismatch: root=${rootVersion}, cli=${cliVersion}`)
}

if (expectedVersion && rootVersion !== expectedVersion) {
  errors.push(`Expected version ${expectedVersion}, got root=${rootVersion}`)
}

if (expectedVersion && cliVersion !== expectedVersion) {
  errors.push(`Expected version ${expectedVersion}, got cli=${cliVersion}`)
}

if (errors.length > 0) {
  console.error('Release version check failed:')
  for (const message of errors) {
    console.error(`- ${message}`)
  }
  process.exit(1)
}

console.log('Release version check passed:')
console.log(`- root version: ${rootVersion}`)
console.log(`- cli version: ${cliVersion}`)
console.log(`- cli name: ${cliName}`)
if (expectedVersion) {
  console.log(`- expected version: ${expectedVersion}`)
}
