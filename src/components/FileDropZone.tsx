import { useCallback, useRef, useState } from 'react'

interface FileDropZoneProps {
  onFiles: (files: FileList | File[]) => void | Promise<void>
  disabled?: boolean
}

export function FileDropZone({ onFiles, disabled }: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      setError(null)
      setLoading(true)
      try {
        await onFiles(files)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao abrir arquivo.')
      } finally {
        setLoading(false)
      }
    },
    [onFiles],
  )

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled && !loading) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          if (!disabled && !loading && e.dataTransfer.files.length) {
            void handleFiles(e.dataTransfer.files)
          }
        }}
        onClick={() => !disabled && !loading && inputRef.current?.click()}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-200 ${
          dragging
            ? 'scale-[1.01] border-dobbs-accent bg-dobbs-accent/10 shadow-lg shadow-dobbs-accent/10'
            : 'border-neutral-300 hover:border-dobbs-accent/60 hover:bg-neutral-50 dark:border-dobbs-border/30 dark:hover:border-dobbs-accent/50 dark:hover:bg-dobbs-surface/80'
        } ${disabled || loading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 ${dragging ? 'opacity-100' : ''}`}
          aria-hidden
        >
          <div className="dobbs-glow h-full w-full" />
        </div>

        <div className="relative">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-dobbs-accent/10 ring-1 ring-dobbs-accent/25">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-dobbs-accent"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-neutral-800 dark:text-dobbs-text">
            {loading ? 'Abrindo arquivo…' : 'Arraste um arquivo .md aqui'}
          </p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-dobbs-muted">
            ou toque para selecionar do dispositivo
          </p>
          <button
            type="button"
            className="btn-primary mt-5"
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.click()
            }}
            disabled={disabled || loading}
          >
            Abrir arquivo Markdown
          </button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".md,.markdown,text/markdown,text/plain"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) void handleFiles(e.target.files)
          e.target.value = ''
        }}
      />

      {error && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
