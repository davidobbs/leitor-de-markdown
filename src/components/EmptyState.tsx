import { AppLogo } from './AppLogo'

export function EmptyStateHero() {
  return (
    <div className="relative text-center">
      <div className="dobbs-glow pointer-events-none absolute inset-x-0 -top-8 h-40" aria-hidden />
      <div className="relative mx-auto mb-6 flex justify-center">
        <AppLogo size="xl" />
      </div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-dobbs-text sm:text-4xl">
        Leitor MD
      </h1>
      <p className="mx-auto mt-3 max-w-md text-neutral-600 dark:text-dobbs-muted">
        Leitor de Markdown privado, rápido e instalável. Seus arquivos nunca saem do dispositivo.
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-widest text-dobbs-accent">
        DOBBS · dobbs.com.br
      </p>
    </div>
  )
}

export function WhatsAppGuide() {
  return (
    <div className="card-surface p-5">
      <h2 className="flex items-center gap-2 font-display text-base font-semibold text-neutral-900 dark:text-dobbs-text">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-dobbs-accent/10 text-dobbs-accent"
          aria-hidden
        >
          ↗
        </span>
        Abrir .md do WhatsApp
      </h2>

      <div className="mt-4 space-y-4">
        <div className="rounded-xl bg-dobbs-accent/5 p-4 dark:bg-dobbs-accent/10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-dobbs-accent">
            Android (recomendado)
          </p>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-neutral-600 dark:text-dobbs-muted">
            <li>Instale o Leitor MD pelo Chrome (menu → Instalar app).</li>
            <li>No WhatsApp, abra o arquivo .md recebido.</li>
            <li>
              Toque em <strong className="text-neutral-800 dark:text-dobbs-text">Compartilhar</strong>{' '}
              ou <strong className="text-neutral-800 dark:text-dobbs-text">Abrir com</strong>.
            </li>
            <li>
              Selecione <strong className="text-neutral-800 dark:text-dobbs-text">Leitor MD</strong>.
            </li>
          </ol>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-dobbs-subtle">
            iOS (limitado)
          </p>
          <p className="text-sm text-neutral-600 dark:text-dobbs-muted">
            O iOS ainda não permite que PWAs abram arquivos do WhatsApp diretamente. Salve o arquivo
            em <strong>Arquivos</strong> e abra pelo seletor acima, ou use arrastar-e-soltar no desktop.
          </p>
        </div>
      </div>
    </div>
  )
}
