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
 * Marca do app — logo oficial DOBBS (logo-dobbs-icon.png).
 * O arquivo-fonte tem fundo transparente; usamos o texto secundário da paleta
 * (#cbd5e1) como fundo — nunca branco puro — preservando o contraste entre o
 * "E" (navy escuro) e o "D" (gradiente azul→ciano), que se perderia sobre o
 * fundo quase-preto do app.
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
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-dobbs-muted shadow-lg shadow-dobbs-accent/20">
          <img
            src="/icons/logo-dobbs-icon.png"
            alt="DOBBS"
            width={config.icon}
            height={config.icon}
            className="h-full w-full object-contain p-[12%]"
          />
        </div>
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
