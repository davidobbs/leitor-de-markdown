import { Link } from 'react-router-dom'
import type { StoredFile } from '../lib/file-utils'

interface RecentFilesListProps {
  files: StoredFile[]
  loading: boolean
  onDelete: (id: string) => void
}

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(timestamp))
}

export function RecentFilesList({ files, loading, onDelete }: RecentFilesListProps) {
  if (loading) {
    return (
      <div className="card-surface p-5">
        <p className="text-sm text-neutral-500 dark:text-dobbs-muted">Carregando arquivos recentes…</p>
      </div>
    )
  }

  if (files.length === 0) return null

  return (
    <section className="card-surface p-5">
      <h2 className="mb-4 font-display text-base font-semibold text-neutral-900 dark:text-dobbs-text">
        Arquivos recentes
      </h2>
      <ul className="divide-y divide-neutral-100 dark:divide-dobbs-border/60">
        {files.map((file) => (
          <li key={file.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <Link
              to={`/read/${file.id}`}
              className="min-w-0 flex-1 rounded-xl p-2 outline-offset-2 transition hover:bg-neutral-50 dark:hover:bg-dobbs-elevated/60"
            >
              <p className="truncate font-medium text-neutral-900 dark:text-dobbs-text">{file.name}</p>
              <p className="mt-0.5 truncate text-sm text-neutral-500 dark:text-dobbs-muted">
                {file.preview}
              </p>
              <p className="mt-1 text-xs text-neutral-400 dark:text-dobbs-subtle">
                {formatDate(file.openedAt)}
              </p>
            </Link>
            <button
              type="button"
              onClick={() => onDelete(file.id)}
              className="shrink-0 rounded-lg px-2 py-1 text-xs text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
              aria-label={`Remover ${file.name}`}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
