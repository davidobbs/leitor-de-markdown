import MarkdownIt from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer.mjs'
import type Token from 'markdown-it/lib/token.mjs'
import taskLists from 'markdown-it-task-lists'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'
import 'highlight.js/styles/github-dark.min.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('markdown', markdown)

export interface TocEntry {
  id: string
  text: string
  level: number
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  highlight(code: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch {
        /* fall through */
      }
    }
    try {
      return hljs.highlightAuto(code).value
    } catch {
      return escapeHtml(code)
    }
  },
})
  .use(taskLists, { enabled: true, label: true })
  .enable(['table', 'strikethrough'])

const slugCounts = new Map<string, number>()

function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

  const count = slugCounts.get(base) ?? 0
  slugCounts.set(base, count + 1)
  return count === 0 ? base : `${base}-${count}`
}

export function parseMarkdown(source: string): { html: string; toc: TocEntry[] } {
  slugCounts.clear()
  const toc: TocEntry[] = []

  const defaultRender =
    md.renderer.rules.heading_open ??
    ((tokens: Token[], idx: number, options, _env, self: Renderer) =>
      self.renderToken(tokens, idx, options))

  md.renderer.rules.heading_open = (
    tokens: Token[],
    idx: number,
    options,
    env,
    self: Renderer,
  ) => {
    const token = tokens[idx]
    const level = Number(token.tag.slice(1))
    if (level <= 3) {
      const inlineToken = tokens[idx + 1]
      const text = inlineToken?.content ?? ''
      const id = slugify(text)
      token.attrSet('id', id)
      toc.push({ id, text, level })
    }
    return defaultRender(tokens, idx, options, env, self)
  }

  md.renderer.rules.link_open = (
    tokens: Token[],
    idx: number,
    options,
    _env,
    self: Renderer,
  ) => {
    const token = tokens[idx]
    const href = token.attrGet('href')
    if (href?.startsWith('http')) {
      token.attrSet('target', '_blank')
      token.attrSet('rel', 'noopener noreferrer')
      token.attrSet('class', 'external-link')
    }
    return self.renderToken(tokens, idx, options)
  }

  const rawHtml = md.render(source)
  const html = DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ['target', 'rel', 'class', 'id'],
  })

  return { html, toc }
}

export async function openMarkdownFromFile(file: File): Promise<{ name: string; content: string }> {
  const content = await file.text()
  return { name: file.name || 'documento.md', content }
}
