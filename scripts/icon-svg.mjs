// Marca "Leitor MD" — paleta de assinatura DOBBS: gradiente azul (#00A3FF) → ciano (#00D4FF)
// em 135deg sobre fundo quase preto (#05070A). Ícone: a lupa, assinatura visual recorrente da marca.

const GRADIENT_DEFS = `
  <defs>
    <linearGradient id="dobbsAccent" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00A3FF"/>
      <stop offset="100%" stop-color="#00D4FF"/>
    </linearGradient>
  </defs>
`

/** Lupa centrada e compatível com a safe zone de ícones maskable (~80% central). */
const LOUPE = `
  <circle cx="226" cy="226" r="80" fill="none" stroke="#05070A" stroke-width="36"/>
  <line x1="282" y1="282" x2="350" y2="350" stroke="#05070A" stroke-width="36" stroke-linecap="round"/>
`

/** Ícone "any" — cantos arredondados, conteúdo até a borda (usado em favicon, atalhos, etc). */
export const iconAnySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${GRADIENT_DEFS}
  <rect width="512" height="512" rx="118" fill="url(#dobbsAccent)"/>
  ${LOUPE}
</svg>`

/** Ícone "maskable" — fundo em sangria total, glifo dentro da safe zone (40% de raio central). */
export const iconMaskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${GRADIENT_DEFS}
  <rect width="512" height="512" fill="url(#dobbsAccent)"/>
  ${LOUPE}
</svg>`

/** Favicon — fundo sólido (sem gradiente) para máxima legibilidade em tamanhos pequenos (16–32px). */
export const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#00A3FF"/>
  <circle cx="14" cy="14" r="5.5" fill="none" stroke="#05070A" stroke-width="2.6"/>
  <line x1="18" y1="18" x2="22.5" y2="22.5" stroke="#05070A" stroke-width="2.6" stroke-linecap="round"/>
</svg>`
