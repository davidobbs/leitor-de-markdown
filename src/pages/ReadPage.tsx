import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MarkdownViewer } from '../components/MarkdownViewer'
import { ReaderToolbar, ScrollProgress, useScrollProgress } from '../components/ReaderToolbar'
import { TableOfContents } from '../components/TableOfContents'
import { useFontSize, useTheme } from '../hooks'
import { parseMarkdown } from '../lib/markdown'
import { getFile, touchFile } from '../lib/storage'

export function ReadPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()
  const { fontSize, increase, decrease } = useFontSize()
  const [content, setContent] = useState<string | null>(null)
  const [title, setTitle] = useState('Carregando…')
  const [tocOpen, setTocOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useScrollProgress()

  useEffect(() => {
    if (!id) {
      setError('Arquivo não encontrado.')
      return
    }

    let cancelled = false

    void (async () => {
      const file = await getFile(id)
      if (cancelled) return

      if (!file) {
        setError('Arquivo não encontrado ou removido.')
        setContent(null)
        return
      }

      setTitle(file.name)
      setContent(file.content)
      setError(null)
      await touchFile(id)
    })()

    return () => {
      cancelled = true
    }
  }, [id])

  const parsed = useMemo(() => {
    if (!content) return { html: '', toc: [] as ReturnType<typeof parseMarkdown>['toc'] }
    return parseMarkdown(content)
  }, [content])

  if (error) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Voltar ao início
        </button>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-neutral-500">Carregando documento…</p>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-white dark:bg-dobbs-bg">
      <ScrollProgress />
      <ReaderToolbar
        title={title}
        theme={theme}
        fontSize={fontSize}
        tocCount={parsed.toc.length}
        onBack={() => navigate('/')}
        onToggleTheme={toggle}
        onIncreaseFont={increase}
        onDecreaseFont={decrease}
        onToggleToc={() => setTocOpen((o) => !o)}
      />

      <TableOfContents
        entries={parsed.toc}
        open={tocOpen}
        onClose={() => setTocOpen(false)}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 pb-16">
        <MarkdownViewer html={parsed.html} fontSize={fontSize} />
      </div>
    </div>
  )
}
