import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 去除多行字符串的公共前导空白。
 * 类似 Python textwrap.dedent，用于保持 template literal 中代码块的整洁缩进。
 *
 * @example
 * dedent`
 *   import { ref } from 'vue'
 *   const count = ref(0)
 * `
 * // => "import { ref } from 'vue'\nconst count = ref(0)"
 */
export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  const raw = String.raw({ raw: strings }, ...values)
  return dedentStr(raw)
}

/**
 * 去除普通字符串的公共前导空白。
 * 用于处理已经构建好的代码字符串。
 */
export function dedentStr(raw: string): string {
  const lines = raw.split('\n')

  // 跳过首尾空行
  let start = 0
  let end = lines.length
  while (start < end && (lines[start] ?? '').trim() === '') start++
  while (end > start && (lines[end - 1] ?? '').trim() === '') end--
  const contentLines = lines.slice(start, end)

  if (contentLines.length === 0) return raw.trim()

  const minIndent = contentLines.reduce((min, line) => {
    const m = /^(\s*)/.exec(line)
    const indent = m?.[1]?.length ?? 0
    return Math.min(min, indent)
  }, Infinity)

  if (minIndent === Infinity || minIndent === 0) {
    return contentLines.join('\n').trimEnd()
  }

  const dedented = contentLines
    .map((line) => (line.length >= minIndent ? line.slice(minIndent) : line))
    .join('\n')

  return dedented.trimEnd()
}
