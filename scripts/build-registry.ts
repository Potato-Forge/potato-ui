import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type RegistryFile = {
  path: string
  type: string
  target?: string
}

type RegistryItemManifest = {
  $schema?: string
  name: string
  type: string
  title: string
  description: string
  dependencies?: string[]
  registryDependencies?: string[]
  devDependencies?: string[]
  meta?: Record<string, unknown>
  files: RegistryFile[]
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const itemsDir = path.join(rootDir, 'registry/items')
const publicDir = path.join(rootDir, 'registry/public')
const itemOutputDir = path.join(publicDir, 'r')

const readJson = async <T>(filePath: string): Promise<T> => {
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw) as T
}

const assertStringArray = (value: unknown, field: string, itemName: string) => {
  if (value === undefined) return
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string' || !entry)) {
    throw new Error(`${itemName}.${field} must be an array of non-empty strings`)
  }
}

const validateManifest = (manifest: RegistryItemManifest, names: Set<string>) => {
  if (!manifest.name) throw new Error('Registry item is missing name')
  if (!manifest.type) throw new Error(`${manifest.name} is missing type`)
  if (!manifest.title) throw new Error(`${manifest.name} is missing title`)
  if (!manifest.description) throw new Error(`${manifest.name} is missing description`)
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    throw new Error(`${manifest.name} must declare at least one file`)
  }

  assertStringArray(manifest.dependencies, 'dependencies', manifest.name)
  assertStringArray(manifest.registryDependencies, 'registryDependencies', manifest.name)
  assertStringArray(manifest.devDependencies, 'devDependencies', manifest.name)

  for (const dependency of manifest.registryDependencies ?? []) {
    if (!names.has(dependency) && !dependency.startsWith('http')) {
      throw new Error(`${manifest.name} declares unknown registry dependency "${dependency}"`)
    }
  }
}

const build = async () => {
  const itemFiles = (await readdir(itemsDir)).filter((file) => file.endsWith('.json')).sort()
  const manifests = await Promise.all(
    itemFiles.map(async (file) => readJson<RegistryItemManifest>(path.join(itemsDir, file))),
  )

  const names = new Set<string>()
  for (const manifest of manifests) {
    if (names.has(manifest.name)) throw new Error(`Duplicate registry item name: ${manifest.name}`)
    names.add(manifest.name)
  }

  await mkdir(itemOutputDir, { recursive: true })

  const registryIndex = []

  for (const manifest of manifests) {
    validateManifest(manifest, names)

    const files = await Promise.all(
      manifest.files.map(async (file) => {
        if (!file.path || !file.type) {
          throw new Error(`${manifest.name} has a file entry missing path or type`)
        }

        const absolutePath = path.join(rootDir, file.path)
        const content = await readFile(absolutePath, 'utf-8').catch((error: unknown) => {
          throw new Error(`${manifest.name} references missing file ${file.path}: ${String(error)}`)
        })

        return {
          path: file.path,
          type: file.type,
          target: file.target,
          content,
        }
      }),
    )

    const payload = {
      $schema: manifest.$schema ?? 'https://shadcn-vue.com/schema/registry-item.json',
      name: manifest.name,
      type: manifest.type,
      title: manifest.title,
      description: manifest.description,
      dependencies: manifest.dependencies ?? [],
      devDependencies: manifest.devDependencies ?? [],
      registryDependencies: manifest.registryDependencies ?? [],
      meta: manifest.meta ?? {},
      files,
    }

    await writeFile(
      path.join(itemOutputDir, `${manifest.name}.json`),
      `${JSON.stringify(payload, null, 2)}\n`,
    )

    registryIndex.push({
      name: manifest.name,
      type: manifest.type,
      title: manifest.title,
      description: manifest.description,
      dependencies: manifest.dependencies ?? [],
      registryDependencies: manifest.registryDependencies ?? [],
      meta: manifest.meta ?? {},
    })
  }

  await writeFile(
    path.join(publicDir, 'registry.json'),
    `${JSON.stringify(
      {
        $schema: 'https://shadcn-vue.com/schema/registry.json',
        name: 'pf-ui',
        homepage: 'https://github.com/potato-forge/potato-ui',
        items: registryIndex,
      },
      null,
      2,
    )}\n`,
  )

  console.log(`Built ${registryIndex.length} registry items into ${path.relative(rootDir, itemOutputDir)}`)
}

build().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
