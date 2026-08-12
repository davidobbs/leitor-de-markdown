/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface LaunchParams {
  files?: FileSystemFileHandle[]
}

interface LaunchQueue {
  setConsumer(callback: (launchParams: LaunchParams) => void): void
}

interface Window {
  launchQueue?: LaunchQueue
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface WindowEventMap {
  beforeinstallprompt: BeforeInstallPromptEvent
}

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
    onRegisterError?: (error: unknown) => void
  }

  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>
}
