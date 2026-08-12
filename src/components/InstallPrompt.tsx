import { useState } from 'react'
import { useInstall } from '../hooks'
import { InstallModal } from './InstallModal'

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14"
      />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

/**
 * CTA única de instalação — um só botão, sempre no cabeçalho, que some
 * automaticamente assim que o app é instalado.
 *
 * Ao clicar: se o navegador já expôs o prompt nativo (Chrome/Edge Android e
 * Desktop), instala DIRETO — sem modal, sem passos, um toque e pronto. O
 * modal com instruções só aparece como último recurso, quando o navegador
 * ainda não liberou o prompt nativo (ex.: iOS/Safari, que nunca oferece essa
 * API, ou um instante antes do Chrome liberar o evento).
 */
export function InstallButton() {
  const { isStandalone, canInstallNatively, promptInstall } = useInstall()
  const [modalOpen, setModalOpen] = useState(false)
  const [installing, setInstalling] = useState(false)

  if (isStandalone) return null

  const handleClick = async () => {
    if (canInstallNatively) {
      setInstalling(true)
      try {
        await promptInstall()
      } finally {
        setInstalling(false)
      }
      return
    }
    setModalOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => void handleClick()}
        disabled={installing}
        className="inline-flex items-center gap-1.5 rounded-xl bg-[linear-gradient(135deg,var(--color-dobbs-accent),var(--color-dobbs-accent-hover))] px-3 py-2 text-xs font-semibold text-dobbs-bg shadow-[0_10px_34px_#00d4ff45] transition-all hover:brightness-105 disabled:cursor-wait disabled:opacity-80 sm:text-sm"
      >
        {installing ? <SpinnerIcon /> : <DownloadIcon />}
        {installing ? 'Instalando…' : 'Instalar'}
      </button>

      <InstallModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
