import { useCallback, useEffect, useState } from 'react'
import { listRecentFiles, deleteFile, saveFile } from '../lib/storage'
import type { StoredFile } from '../lib/file-utils'
import { isMarkdownFile, readFileAsText } from '../lib/file-utils'
import {
  detectBrowser,
  detectPlatform,
  isStandaloneDisplay,
  type BrowserName,
  type Platform,
} from '../lib/platform'

export function useRecentFiles() {
  const [files, setFiles] = useState<StoredFile[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const recent = await listRecentFiles()
    setFiles(recent)
    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const remove = useCallback(
    async (id: string) => {
      await deleteFile(id)
      await refresh()
    },
    [refresh],
  )

  return { files, loading, refresh, remove }
}

export function useOpenFile() {
  const openFiles = useCallback(async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter(isMarkdownFile)
    if (files.length === 0) {
      throw new Error('Nenhum arquivo Markdown válido selecionado.')
    }

    const file = files[0]
    const content = await readFileAsText(file)
    const saved = await saveFile(file.name, content)
    return saved
  }, [])

  return { openFiles }
}

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('leitor-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('leitor-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle, setTheme: setThemeState }
}

interface UseInstallResult {
  platform: Platform
  browser: BrowserName
  isStandalone: boolean
  /** true quando o navegador oferece instalação em 1 toque (Chrome/Edge Android e Desktop) */
  canInstallNatively: boolean
  /** dispara o prompt nativo; resolve `true` se o usuário aceitou instalar */
  promptInstall: () => Promise<boolean>
  justInstalled: boolean
}

export function useInstall(): UseInstallResult {
  const [platform] = useState<Platform>(() => detectPlatform())
  const [browser] = useState<BrowserName>(() => detectBrowser())
  const [isStandalone, setIsStandalone] = useState(() => isStandaloneDisplay())
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [justInstalled, setJustInstalled] = useState(false)

  useEffect(() => {
    const onBeforeInstall = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    const onInstalled = () => {
      setJustInstalled(true)
      setIsStandalone(true)
      setDeferredPrompt(null)
    }
    const mql = window.matchMedia('(display-mode: standalone)')
    const onDisplayModeChange = () => setIsStandalone(isStandaloneDisplay())

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    mql.addEventListener('change', onDisplayModeChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
      mql.removeEventListener('change', onDisplayModeChange)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    return outcome === 'accepted'
  }, [deferredPrompt])

  return {
    platform,
    browser,
    isStandalone,
    canInstallNatively: deferredPrompt !== null,
    promptInstall,
    justInstalled,
  }
}

export function useFontSize() {
  const [fontSize, setFontSize] = useState(() => {
    const stored = localStorage.getItem('leitor-font-size')
    return stored ? Number(stored) : 100
  })

  useEffect(() => {
    localStorage.setItem('leitor-font-size', String(fontSize))
  }, [fontSize])

  const increase = useCallback(() => setFontSize((s) => Math.min(s + 10, 150)), [])
  const decrease = useCallback(() => setFontSize((s) => Math.max(s - 10, 80)), [])

  return { fontSize, increase, decrease }
}
