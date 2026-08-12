import { useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppLogo, ThemeToggle } from '../components/AppLogo'
import { EmptyStateHero, WhatsAppGuide } from '../components/EmptyState'
import { FileDropZone } from '../components/FileDropZone'
import { InstallButton, InstallPrompt } from '../components/InstallPrompt'
import { RecentFilesList } from '../components/RecentFilesList'
import { useOpenFile, useRecentFiles, useTheme } from '../hooks'

interface HomePageProps {
  openMode?: boolean
}

export function HomePage({ openMode }: HomePageProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { files, loading, refresh, remove } = useRecentFiles()
  const { openFiles } = useOpenFile()
  const { toggle } = useTheme()

  const error = searchParams.get('error')

  const handleOpen = useCallback(
    async (fileList: FileList | File[]) => {
      const saved = await openFiles(fileList)
      await refresh()
      navigate(`/read/${saved.id}`)
    },
    [navigate, openFiles, refresh],
  )

  return (
    <div className="dobbs-grid-bg min-h-dvh bg-neutral-50 dark:bg-dobbs-bg">
      <header className="panel-glass sticky top-0 z-20 border-b">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <AppLogo size="sm" showWordmark />
          <div className="flex items-center gap-2">
            <InstallButton />
            <button
              type="button"
              onClick={toggle}
              className="btn-ghost !px-3 !py-2"
              aria-label="Alternar tema"
            >
              <ThemeToggle />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-8 pb-12">
        <EmptyStateHero />

        {error === 'share' && (
          <p
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
            role="alert"
          >
            Não foi possível abrir o arquivo compartilhado. Tente novamente ou use o seletor de
            arquivos.
          </p>
        )}

        <InstallPrompt />

        <FileDropZone onFiles={handleOpen} />

        {openMode && (
          <p className="text-center text-sm text-neutral-500 dark:text-dobbs-muted">
            Selecione um arquivo .md para abrir com o Leitor MD.
          </p>
        )}

        <RecentFilesList files={files} loading={loading} onDelete={remove} />

        <WhatsAppGuide />

        <footer className="pt-4 text-center text-xs text-neutral-400 dark:text-dobbs-subtle">
          Feito por{' '}
          <a
            href="https://dobbs.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dobbs-accent transition-colors hover:text-signature-gold"
          >
            DOBBS
          </a>
        </footer>
      </main>
    </div>
  )
}
