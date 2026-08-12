export type Platform = 'ios' | 'android' | 'desktop'
export type BrowserName = 'chrome' | 'edge' | 'safari' | 'firefox' | 'samsung' | 'other'

export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent

  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes('Macintosh') && navigator.maxTouchPoints > 1)
  if (isIOS) return 'ios'

  if (/Android/.test(ua)) return 'android'

  return 'desktop'
}

export function detectBrowser(): BrowserName {
  if (typeof navigator === 'undefined') return 'other'
  const ua = navigator.userAgent

  if (/SamsungBrowser/.test(ua)) return 'samsung'
  if (/Edg\//.test(ua)) return 'edge'
  if (/Firefox\//.test(ua)) return 'firefox'
  if (/CriOS/.test(ua)) return 'chrome'
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return 'chrome'
  if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return 'safari'

  return 'other'
}

export function isStandaloneDisplay(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}
