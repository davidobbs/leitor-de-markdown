import { useEffect, useState } from 'react'
import type { TocEntry } from '../lib/markdown'

interface TableOfContentsProps {
  entries: TocEntry[]
  open: boolean
  onClose: () => void
}

export function TableOfContents({ entries, open, onClose }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (entries.length === 0) return

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    entries.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Fechar índice"
          onClick={onClose}
        />
      )}

      <aside
        className={`panel-glass fixed top-0 right-0 z-50 h-full w-72 transform border-l p-4 shadow-xl transition-transform duration-200 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-dobbs-muted">
            Índice
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-500 hover:bg-neutral-100 dark:text-dobbs-muted dark:hover:bg-dobbs-elevated"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <nav className="overflow-y-auto pb-8" style={{ maxHeight: 'calc(100dvh - 4rem)' }}>
          <ul className="space-y-1 text-sm">
            {entries.map((entry) => (
              <li key={entry.id} style={{ paddingLeft: `${(entry.level - 1) * 0.75}rem` }}>
                <a
                  href={`#${entry.id}`}
                  onClick={onClose}
                  className={`block rounded-md px-2 py-1.5 transition-colors ${
                    activeId === entry.id
                      ? 'bg-dobbs-accent/15 font-medium text-dobbs-accent'
                      : 'text-neutral-600 hover:bg-neutral-100 dark:text-dobbs-muted dark:hover:bg-dobbs-elevated'
                  }`}
                >
                  {entry.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
