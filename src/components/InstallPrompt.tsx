import { useState } from 'react'
import { useInstall } from '../hooks'
import { AppLogo } from './AppLogo'
import { InstallModal } from './InstallModal'

const DISMISS_KEY = 'leitor-install-dismissed'

export function InstallPrompt() {
  const { isStandalone } = useInstall()
  const [modalOpen, setModalOpen] = useState(false)
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISS_KEY) === '1')

  if (isStandalone || dismissed) return null

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-dobbs-accent/25 bg-dobbs-surface p-4 dark:bg-dobbs-elevated/50">
        <div className="dobbs-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <AppLogo size="sm" />
            <div>
              <p className="font-display font-semibold text-dobbs-text">Instale o Leitor MD</p>
              <p className="mt-1 text-sm text-dobbs-muted">
                Ícone na tela inicial, offline e abertura direta de .md do WhatsApp.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => {
                localStorage.setItem(DISMISS_KEY, '1')
                setDismissed(true)
              }}
              className="btn-ghost"
            >
              Agora não
            </button>
            <button type="button" onClick={() => setModalOpen(true)} className="btn-primary">
              Instalar app
            </button>
          </div>
        </div>
      </div>

      <InstallModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

/** Botão compacto para o cabeçalho — sempre visível enquanto o app não estiver instalado. */
export function InstallButton() {
  const { isStandalone } = useInstall()
  const [modalOpen, setModalOpen] = useState(false)

  if (isStandalone) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl bg-dobbs-accent px-3 py-2 text-xs font-semibold text-dobbs-bg transition hover:bg-dobbs-accent-hover sm:text-sm"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14"
          />
        </svg>
        Instalar
      </button>

      <InstallModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
