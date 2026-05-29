#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REMOTE_REGISTRY = 'https://xby020.github.io/potato-ui'

const cliRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(cliRoot, '..', '..')
const localRegistry = path.join(repoRoot, 'registry/public')
const defaultRegistry = existsSync(path.join(localRegistry, 'registry.json'))
  ? localRegistry
  : REMOTE_REGISTRY

const usage = () => {
  console.log(`Usage:
  potato-ui add <name> [--cwd <target>] [--registry <url-or-path>] [--dry-run] [--force]
  pf-ui add <name> [--cwd <target>] [--registry <url-or-path>] [--dry-run] [--force]

Examples:
  pnpm dlx @potato-forge/cli add pf-button
  pnpm dlx @potato-forge/cli add pf-form --cwd ./apps/web
  pnpm dlx @potato-forge/cli add pf-button --registry https://xby020.github.io/potato-ui
`)
}

const parseArgs = () => {
  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    usage()
    process.exit(0)
  }

  const command = args[0]
  if (command !== 'add') {
    usage()
    process.exit(1)
  }

  const options = {
    cwd: process.cwd(),
    registry: process.env.POTATO_UI_REGISTRY || defaultRegistry,
    dryRun: false,
    force: false,
  }
  let name = ''

  for (let index = 1; index < args.length; index += 1) {
    const arg = args[index]

    if (arg === '--cwd') {
      const value = args[++index]
      if (!value) throw new Error('--cwd requires a value')
      options.cwd = path.resolve(value)
    } else if (arg === '--registry') {
      const value = args[++index]
      if (!value) throw new Error('--registry requires a value')
      options.registry = value
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg === '--force') {
      options.force = true
    } else if (!arg.startsWith('-') && !name) {
      name = arg
    } else {
      throw new Error(`Unknown option: ${arg}`)
    }
  }

  if (!name) {
    usage()
    process.exit(1)
  }

  return { name, options }
}

const isUrl = (value) => /^https?:\/\//.test(value)

const joinUrl = (base, pathname) =>
  `${base.replace(/\/+$/, '')}/${pathname.replace(/^\/+/, '')}`

const itemUrl = (registry, name) => {
  if (name.startsWith('http')) return name
  if (isUrl(registry)) return joinUrl(registry, `r/${name}.json`)
  return path.join(registry, 'r', `${name}.json`)
}

const readItem = async (registry, name) => {
  const location = itemUrl(registry, name)
  const raw = isUrl(location)
    ? await fetch(location).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${location}: ${response.status} ${response.statusText}`)
      }
      return response.text()
    })
    : await readFile(location, 'utf-8')

  return JSON.parse(raw)
}

const collectItems = async (registry, name, seen = new Set(), ordered = []) => {
  if (seen.has(name)) return ordered
  seen.add(name)

  const item = await readItem(registry, name)
  for (const dependency of item.registryDependencies ?? []) {
    await collectItems(registry, dependency, seen, ordered)
  }

  ordered.push(item)
  return ordered
}

const writeTargetFile = async (targetRoot, file, options) => {
  const target = path.resolve(targetRoot, file.target || file.path)
  const relativeTarget = path.relative(targetRoot, target)

  if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) {
    throw new Error(`Refusing to write outside target cwd: ${file.target || file.path}`)
  }

  if (options.dryRun) {
    return { target, action: 'dry-run' }
  }

  const existing = await readFile(target, 'utf-8').catch(() => null)
  if (existing !== null && existing !== file.content && !options.force) {
    throw new Error(`Refusing to overwrite changed file without --force: ${relativeTarget}`)
  }

  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, file.content)
  return { target, action: existing === file.content ? 'unchanged' : 'written' }
}

const main = async () => {
  const { name, options } = parseArgs()
  const targetRoot = path.resolve(options.cwd)
  const items = await collectItems(options.registry, name)
  const dependencies = new Set()
  const devDependencies = new Set()
  const written = []
  const unchanged = []

  for (const item of items) {
    item.dependencies?.forEach((dependency) => dependencies.add(dependency))
    item.devDependencies?.forEach((dependency) => devDependencies.add(dependency))

    for (const file of item.files) {
      const result = await writeTargetFile(targetRoot, file, options)
      const relative = path.relative(targetRoot, result.target)
      if (result.action === 'unchanged') unchanged.push(relative)
      else written.push(relative)
    }
  }

  console.log(`Registry: ${options.registry}`)
  console.log(`Installed registry items: ${items.map((item) => item.name).join(', ')}`)
  console.log(`${options.dryRun ? 'Would write' : 'Wrote'} ${written.length} files.`)
  if (unchanged.length) console.log(`Unchanged ${unchanged.length} files.`)

  if (dependencies.size) {
    console.log(`Install dependencies: pnpm add ${Array.from(dependencies).sort().join(' ')}`)
  }

  if (devDependencies.size) {
    console.log(`Install dev dependencies: pnpm add -D ${Array.from(devDependencies).sort().join(' ')}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
