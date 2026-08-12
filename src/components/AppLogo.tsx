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

export function AppLogo({ size = 'md', showWordmark = false, className = '' }: AppLogoProps) {
  const config = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${config.box} relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-dobbs-accent/20 ring-1 ring-dobbs-accent/30`}
        aria-hidden
      >
        <LogoMark size={config.icon} />
      </div>
      {showWordmark && (
        <div>
          <p className={`font-display font-bold tracking-tight text-dobbs-text ${config.text}`}>
            Leitor MD
          </p>
          <p className="text-xs text-dobbs-muted">by DOBBS</p>
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
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Leitor MD"
    >
      <defs>
        <linearGradient id="dobbs-bg" x1="0" y1="0" x2="512" y2="512">
          <stop offset="0%" stopColor="#0B1020" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="dobbs-glow" x1="128" y1="64" x2="384" y2="448">
          <stop offset="0%" stopColor="#14F4C9" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#dobbs-bg)" />
      <rect
        x="24"
        y="24"
        width="464"
        height="464"
        rx="96"
        stroke="url(#dobbs-glow)"
        strokeOpacity="0.35"
        strokeWidth="2"
        fill="none"
      />
      <g filter="url(#glow)">
        <path
          d="M148 148h216v28H148v-28zm0 72h176v28H148v-28zm0 72h128v28H148v-28z"
          fill="url(#dobbs-glow)"
          fillOpacity="0.95"
        />
        <path
          d="M332 356l52 52-20 20-52-52 20-20z"
          fill="#14F4C9"
        />
        <circle cx="384" cy="384" r="10" fill="#22D3EE" />
      </g>
      <text
        x="256"
        y="430"
        textAnchor="middle"
        fill="#94A3B8"
        fontFamily="system-ui, sans-serif"
        fontSize="44"
        fontWeight="600"
        letterSpacing="8"
      >
        MD
      </text>
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
