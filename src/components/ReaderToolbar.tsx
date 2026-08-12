import { useEffect } from 'react'

interface ReaderToolbarProps {
  title: string
  theme: 'light' | 'dark'
  fontSize: number
  tocCount: number
  onBack: () => void
  onToggleTheme: () => void
  onIncreaseFont: () => void
  onDecreaseFont: () => void
  onToggleToc: () => void
}

export function ReaderToolbar({
  title,
  theme,
  fontSize,
  tocCount,
  onBack,
  onToggleTheme,
  onIncreaseFont,
  onDecreaseFont,
  onToggleToc,
}: ReaderToolbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md dark:border-dobbs-border/50 dark:bg-dobbs-bg/90">
      <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="btn-ghost shrink-0 !px-2 !py-1.5 text-sm"
          aria-label="Voltar"
        >
          ← Voltar
        </button>

        <p className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-800 dark:text-dobbs-text">
          {title}
        </p>

        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={onDecreaseFont}
            className="rounded-lg px-2 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-dobbs-elevated"
            aria-label="Diminuir fonte"
          >
            A−
          </button>
          <span className="hidden text-xs text-neutral-500 dark:text-dobbs-subtle sm:inline">
            {fontSize}%
          </span>
          <button
            type="button"
            onClick={onIncreaseFont}
            className="rounded-lg px-2 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-dobbs-elevated"
            aria-label="Aumentar fonte"
          >
            A+
          </button>

          {tocCount > 0 && (
            <button
              type="button"
              onClick={onToggleToc}
              className="rounded-lg px-2 py-1.5 text-sm text-dobbs-accent hover:bg-dobbs-accent/10"
              aria-label="Abrir índice"
            >
              Índice
            </button>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-lg px-2 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-dobbs-elevated"
            aria-label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}

export function ScrollProgress() {
  return (
    <div
      id="scroll-progress"
      className="fixed top-0 left-0 z-40 h-0.5 origin-left bg-dobbs-accent transition-transform duration-100"
      style={{ width: '100%', transform: 'scaleX(0)' }}
      aria-hidden
    />
  )
}

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.transform = `scaleX(${progress})`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
