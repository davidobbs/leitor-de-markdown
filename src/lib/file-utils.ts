export const DB_NAME = 'leitor-md'
export const DB_VERSION = 1
export const STORE_NAME = 'files'

export interface StoredFile {
  id: string
  name: string
  content: string
  preview: string
  openedAt: number
}

export function createFileId(): string {
  return crypto.randomUUID()
}

export function buildPreview(content: string): string {
  const line = content
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.length > 0 && !l.startsWith('#'))

  if (!line) {
    const heading = content.match(/^#+\s*(.+)/m)
    return heading?.[1]?.slice(0, 120) ?? 'Documento Markdown'
  }

  return line.replace(/^#+\s*/, '').slice(0, 120)
}

export function isMarkdownFile(file: File): boolean {
  const name = file.name.toLowerCase()
  return (
    name.endsWith('.md') ||
    name.endsWith('.markdown') ||
    file.type === 'text/markdown' ||
    file.type === 'text/plain' ||
    file.type === ''
  )
}

export async function readFileAsText(file: File): Promise<string> {
  return file.text()
}
