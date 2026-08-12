import { useEffect, useState } from 'react'
import { AppLogo } from './AppLogo'

interface InstallPromptProps {
  onInstalled?: () => void
}

export function InstallPrompt({ onInstalled }: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('leitor-install-dismissed') === '1'
  })
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)

    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (isStandalone || dismissed || !deferredPrompt) return null

  const install = async () => {
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      onInstalled?.()
    }
    setDeferredPrompt(null)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-dobbs-accent/25 bg-dobbs-surface p-4 dark:bg-dobbs-elevated/50">
      <div className="dobbs-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <AppLogo size="sm" />
          <div>
            <p className="font-display font-semibold text-dobbs-text">Instale o Leitor MD</p>
            <p className="mt-1 text-sm text-dobbs-muted">
              Ícone na tela inicial, offline e abertura direta de .md do WhatsApp no Android.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => {
            localStorage.setItem('leitor-install-dismissed', '1')
            setDismissed(true)
          }} className="btn-ghost">
            Agora não
          </button>
          <button type="button" onClick={() => void install()} className="btn-primary">
            Instalar app
          </button>
        </div>
      </div>
    </div>
  )
}

export function InstallInstructions() {
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)
  }, [])

  if (isStandalone) return null

  return (
    <details className="card-surface p-4">
      <summary className="cursor-pointer font-medium text-neutral-800 dark:text-dobbs-text">
        Como instalar o app
      </summary>
      <div className="mt-3 space-y-3 text-sm text-neutral-600 dark:text-dobbs-muted">
        <div>
          <p className="font-medium text-neutral-800 dark:text-dobbs-text">Desktop (Chrome / Edge)</p>
          <p>Clique no ícone ⊕ na barra de endereço ou Menu → Instalar Leitor MD.</p>
        </div>
        <div>
          <p className="font-medium text-neutral-800 dark:text-dobbs-text">Android (Chrome)</p>
          <p>Menu ⋮ → Instalar app ou Adicionar à tela inicial.</p>
        </div>
        <div>
          <p className="font-medium text-neutral-800 dark:text-dobbs-text">iOS (Safari)</p>
          <p>Compartilhar → Adicionar à Tela de Início.</p>
        </div>
      </div>
    </details>
  )
}
