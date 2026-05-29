# @potato-forge/cli

Install Potato UI registry items into a Vue 3 + UnoCSS project as source files.

```bash
pnpm dlx @potato-forge/cli add pf-button
pnpm dlx @potato-forge/cli add pf-form
```

The CLI copies registry files into the target project, recursively includes Potato UI registry dependencies, and prints any npm dependencies that should be installed with `pnpm add`.

## Options

```bash
potato-ui add <name> [--cwd <target>] [--registry <url-or-path>] [--dry-run] [--force]
```

- `--cwd`: target project directory. Defaults to the current directory.
- `--registry`: registry base URL or local registry/public path.
- `--dry-run`: print planned writes without changing files.
- `--force`: allow overwriting changed target files.

The default registry is `https://xby020.github.io/potato-ui`.
