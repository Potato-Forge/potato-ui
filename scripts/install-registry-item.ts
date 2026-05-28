import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type RegistryFile = {
  path: string
  type: string
  target?: string
  content: string
}

type RegistryItem = {
  name: string
  title?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

type InstallOptions = {
  cwd: string
  registry: string
  dryRun: boolean
  force: boolean
}

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const defaultRegistry = path.join(repoRoot, 'registry/public')

const usage = () => {
  console.log(`Usage:
  pnpm pf:add <name> [--cwd <target>] [--registry <url-or-path>] [--dry-run] [--force]

Examples:
  pnpm pf:add pf-button --cwd ../consumer-app
  pnpm pf:add pf-form --cwd ../consumer-app --dry-run
  pnpm pf:add pf-button --registry https://potato-forge.github.io/potato-ui
`)
}

const parseArgs = () => {
  const args = process.argv.slice(2)
  const command = args[0]
  const name = args[1]

  if (command !== 'add' || !name) {
    usage()
    process.exit(command === '--help' || command === '-h' ? 0 : 1)
  }

  const options: InstallOptions = {
    cwd: process.cwd(),
    registry: defaultRegistry,
    dryRun: false,
    force: false,
  }

  for (let index = 2; index < args.length; index += 1) {
    const arg = args[index]

    if (arg === '--cwd') {
      options.cwd = path.resolve(args[++index] || '')
    } else if (arg === '--registry') {
      options.registry = args[++index] || defaultRegistry
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg === '--force') {
      options.force = true
    } else {
      throw new Error(`Unknown option: ${arg}`)
    }
  }

  return { name, options }
}

const isUrl = (value: string) => /^https?:\/\//.test(value)

const joinUrl = (base: string, pathname: string) =>
  `${base.replace(/\/+$/, '')}/${pathname.replace(/^\/+/, '')}`

const itemUrl = (registry: string, name: string) => {
  if (name.startsWith('http')) return name
  if (isUrl(registry)) return joinUrl(registry, `r/${name}.json`)
  return path.join(registry, 'r', `${name}.json`)
}

const readItem = async (registry: string, name: string): Promise<RegistryItem> => {
  const location = itemUrl(registry, name)
  const raw = isUrl(location)
    ? await fetch(location).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${location}: ${response.status} ${response.statusText}`)
        }
        return response.text()
      })
    : await readFile(location, 'utf-8')

  return JSON.parse(raw) as RegistryItem
}

const collectItems = async (
  registry: string,
  name: string,
  seen = new Set<string>(),
  ordered: RegistryItem[] = [],
) => {
  if (seen.has(name)) return ordered
  seen.add(name)

  const item = await readItem(registry, name)
  for (const dependency of item.registryDependencies ?? []) {
    await collectItems(registry, dependency, seen, ordered)
  }

  ordered.push(item)
  return ordered
}

const writeTargetFile = async (targetRoot: string, file: RegistryFile, options: InstallOptions) => {
  const target = path.resolve(targetRoot, file.target || file.path)
  const relativeTarget = path.relative(targetRoot, target)

  if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) {
    throw new Error(`Refusing to write outside target cwd: ${file.target || file.path}`)
  }

  if (options.dryRun) {
    return { target, action: 'dry-run' as const }
  }

  const existing = await readFile(target, 'utf-8').catch(() => null)
  if (existing !== null && existing !== file.content && !options.force) {
    throw new Error(`Refusing to overwrite changed file without --force: ${relativeTarget}`)
  }

  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, file.content)
  return { target, action: existing === file.content ? ('unchanged' as const) : ('written' as const) }
}

const main = async () => {
  const { name, options } = parseArgs()
  const targetRoot = path.resolve(options.cwd)
  const items = await collectItems(options.registry, name)
  const dependencies = new Set<string>()
  const devDependencies = new Set<string>()
  const written: string[] = []
  const unchanged: string[] = []

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

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
