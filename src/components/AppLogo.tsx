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
 * Marca do app — reaproveita o sistema visual do componente Logo (dobbs.com.br):
 * quadrado com gradiente accent-500→accent-600, glow suave e tipografia Space Grotesk.
 */
export function AppLogo({ size = 'md', showWordmark = false, className = '' }: AppLogoProps) {
  const config = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${config.box} relative shrink-0`}>
        <div
          className="absolute inset-0 rounded-xl bg-dobbs-accent/25 blur-md"
          aria-hidden
        />
        <LogoMark size={config.icon} />
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

export function LogoMark({ size = 512 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Leitor MD"
      className="relative"
    >
      <defs>
        <linearGradient id="dobbsAccent" x1="8" y1="8" x2="88" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00A3FF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="88" height="88" rx="22" fill="url(#dobbsAccent)" />
      {/* Lupa — ícone de assinatura recorrente da marca DOBBS */}
      <circle cx="42" cy="42" r="15" fill="none" stroke="#05070A" strokeWidth="7" />
      <line x1="53" y1="53" x2="66" y2="66" stroke="#05070A" strokeWidth="7" strokeLinecap="round" />
    </svg>
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
