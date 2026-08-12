import { useEffect, useState } from 'react'
import type { Platform } from '../lib/platform'
import { useInstall } from '../hooks'
import { AppLogo } from './AppLogo'

interface InstallModalProps {
  open: boolean
  onClose: () => void
}

const TABS: { id: Platform; label: string; icon: string }[] = [
  { id: 'android', label: 'Android', icon: '🤖' },
  { id: 'desktop', label: 'Desktop', icon: '💻' },
  { id: 'ios', label: 'iPhone / iPad', icon: '📱' },
]

function StepIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-dobbs-accent/15 text-sm font-bold text-dobbs-accent">
      {children}
    </span>
  )
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v12m0-12l-4 4m4-4l4 4M5 15v4a2 2 0 002 2h10a2 2 0 002-2v-4"
      />
    </svg>
  )
}

function MenuDotsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  )
}

function PlusSquareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" strokeWidth="2" />
      <path strokeLinecap="round" strokeWidth="2" d="M12 8v8m-4-4h8" />
    </svg>
  )
}

function AndroidSteps({
  canInstallNatively,
  onInstall,
  installing,
}: {
  canInstallNatively: boolean
  onInstall: () => void
  installing: boolean
}) {
  if (canInstallNatively) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-neutral-600 dark:text-dobbs-muted">
          Seu navegador já suporta instalação em um toque. Basta clicar no botão abaixo.
        </p>
        <button type="button" onClick={onInstall} disabled={installing} className="btn-primary w-full">
          {installing ? 'Instalando…' : 'Instalar agora'}
        </button>
      </div>
    )
  }

  return (
    <ol className="space-y-4 text-sm">
      <li className="flex items-start gap-3">
        <StepIcon>
          <MenuDotsIcon />
        </StepIcon>
        <p className="pt-1 text-neutral-700 dark:text-dobbs-text">
          Toque no menu <strong>⋮</strong> no canto superior do Chrome.
        </p>
      </li>
      <li className="flex items-start gap-3">
        <StepIcon>2</StepIcon>
        <p className="pt-1 text-neutral-700 dark:text-dobbs-text">
          Selecione <strong>Instalar aplicativo</strong> (ou <strong>Adicionar à tela inicial</strong>).
        </p>
      </li>
      <li className="flex items-start gap-3">
        <StepIcon>3</StepIcon>
        <p className="pt-1 text-neutral-700 dark:text-dobbs-text">
          Confirme tocando em <strong>Instalar</strong>. Pronto — o ícone aparece na sua tela inicial.
        </p>
      </li>
    </ol>
  )
}

function DesktopSteps({
  canInstallNatively,
  onInstall,
  installing,
}: {
  canInstallNatively: boolean
  onInstall: () => void
  installing: boolean
}) {
  if (canInstallNatively) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-neutral-600 dark:text-dobbs-muted">
          Seu navegador já suporta instalação em um clique. Basta clicar no botão abaixo.
        </p>
        <button type="button" onClick={onInstall} disabled={installing} className="btn-primary w-full">
          {installing ? 'Instalando…' : 'Instalar agora'}
        </button>
      </div>
    )
  }

  return (
    <ol className="space-y-4 text-sm">
      <li className="flex items-start gap-3">
        <StepIcon>
          <PlusSquareIcon />
        </StepIcon>
        <p className="pt-1 text-neutral-700 dark:text-dobbs-text">
          Procure o ícone <strong>⊕ Instalar</strong> na barra de endereço (Chrome ou Edge).
        </p>
      </li>
      <li className="flex items-start gap-3">
        <StepIcon>2</StepIcon>
        <p className="pt-1 text-neutral-700 dark:text-dobbs-text">
          Não encontrou? Abra o menu <strong>⋮</strong> → <strong>Instalar Leitor MD…</strong>
        </p>
      </li>
      <li className="flex items-start gap-3">
        <StepIcon>3</StepIcon>
        <p className="pt-1 text-neutral-700 dark:text-dobbs-text">
          Clique em <strong>Instalar</strong>. O app abre em janela própria, com ícone no seu computador.
        </p>
      </li>
    </ol>
  )
}

function IosSteps() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
        Use o navegador <strong>Safari</strong> — o Chrome no iPhone/iPad não permite instalar apps.
      </div>
      <ol className="space-y-4 text-sm">
        <li className="flex items-start gap-3">
          <StepIcon>
            <ShareIcon />
          </StepIcon>
          <p className="pt-1 text-neutral-700 dark:text-dobbs-text">
            Toque no ícone de <strong>Compartilhar</strong> (quadrado com seta) na barra do Safari.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <StepIcon>2</StepIcon>
          <p className="pt-1 text-neutral-700 dark:text-dobbs-text">
            Deslize e toque em <strong>Adicionar à Tela de Início</strong>.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <StepIcon>3</StepIcon>
          <p className="pt-1 text-neutral-700 dark:text-dobbs-text">
            Toque em <strong>Adicionar</strong> no canto superior direito. Pronto!
          </p>
        </li>
      </ol>
    </div>
  )
}

export function InstallModal({ open, onClose }: InstallModalProps) {
  const { platform, canInstallNatively, promptInstall, isStandalone } = useInstall()
  const [activeTab, setActiveTab] = useState<Platform>(platform)
  const [installing, setInstalling] = useState(false)

  useEffect(() => {
    if (open) setActiveTab(platform)
  }, [open, platform])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (isStandalone) onClose()
  }, [isStandalone, onClose])

  if (!open) return null

  const handleInstall = async () => {
    setInstalling(true)
    try {
      await promptInstall()
    } finally {
      setInstalling(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Fechar"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-modal-title"
        className="dobbs-grid-bg relative w-full max-w-md rounded-t-3xl border border-neutral-200 bg-white p-6 shadow-2xl sm:rounded-3xl dark:border-dobbs-border dark:bg-dobbs-surface"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 dark:text-dobbs-muted dark:hover:bg-dobbs-elevated"
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="mb-5 flex items-center gap-3">
          <AppLogo size="sm" />
          <div>
            <h2
              id="install-modal-title"
              className="font-display text-lg font-bold text-neutral-900 dark:text-dobbs-text"
            >
              Instalar Leitor MD
            </h2>
            <p className="text-xs text-dobbs-muted">Rápido, offline e sem loja de apps</p>
          </div>
        </div>

        <div className="mb-5 flex gap-1 rounded-xl bg-neutral-100 p-1 dark:bg-dobbs-bg">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors sm:text-sm ${
                activeTab === tab.id
                  ? 'bg-white text-dobbs-bg shadow dark:bg-dobbs-accent dark:text-dobbs-bg'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-dobbs-muted dark:hover:text-dobbs-text'
              }`}
            >
              <span className="mr-1" aria-hidden>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[180px]">
          {activeTab === 'android' && (
            <AndroidSteps
              canInstallNatively={platform === 'android' && canInstallNatively}
              onInstall={handleInstall}
              installing={installing}
            />
          )}
          {activeTab === 'desktop' && (
            <DesktopSteps
              canInstallNatively={platform === 'desktop' && canInstallNatively}
              onInstall={handleInstall}
              installing={installing}
            />
          )}
          {activeTab === 'ios' && <IosSteps />}
        </div>

        <p className="mt-5 text-center text-xs text-neutral-400 dark:text-dobbs-subtle">
          Seus arquivos nunca saem do dispositivo — mesmo instalado.
        </p>
      </div>
    </div>
  )
}
