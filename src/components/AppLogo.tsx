import { useEffect, useState } from 'react'

type AppLogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showWordmark?: boolean
  className?: string
}

const sizes = {
  sm: { box: 'h-9 w-9', icon: 36, text: 'text-sm' },
  md: { box: 'h-12 w-12', icon: 48, text: 'text-base' },
  lg: { box: 'h-16 w-16', icon: 64, text: 'text-lg' },
  xl: { box: 'h-20 w-20', icon: 80, text: 'text-xl' },
}

/**
 * Marca do app — logo oficial DOBBS, variante "dark" (logo-dobbs-icon-dark.png).
 * O arquivo original tem o "E" em navy quase-preto, ótimo sobre branco mas
 * invisível sobre o fundo da marca. Em vez de colocar uma placa clara atrás
 * (que sempre acaba "lendo" como branco), a variante dark recolore o "E" para
 * o texto principal da paleta (#f5f7fa) e mantém o "D" azul→ciano intacto —
 * assim a logo flutua direto sobre o fundo quase-preto, sem placa.
 */
export function AppLogo({ size = 'md', showWordmark = false, className = '' }: AppLogoProps) {
  const config = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${config.box} relative shrink-0`}>
        <div
          className="absolute inset-0 rounded-xl bg-dobbs-accent/20 blur-lg"
          aria-hidden
        />
        <img
          src="/icons/logo-dobbs-icon-dark.png"
          alt="DOBBS"
          width={config.icon}
          height={config.icon}
          className="relative h-full w-full object-contain drop-shadow-[0_4px_16px_rgba(0,163,255,0.35)]"
        />
      </div>
      {showWordmark && (
        <div className="flex flex-col">
          <span className="font-display text-sm font-semibold tracking-tight text-neutral-900 dark:text-dobbs-text">
            leitor<span className="text-dobbs-accent-deep dark:text-dobbs-accent">md</span>
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-dobbs-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-dobbs-accent" aria-hidden />
            by dobbs
          </span>
        </div>
      )}
    </div>
  )
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <span className="text-base" aria-hidden>
      {theme === 'dark' ? '☀️' : '🌙'}
    </span>
  )
}
