// Marca "Leitor MD" — mesmo ícone do dobbs.com.br (componente Logo, variante "icon"):
// quadrado com gradiente azul (#00A3FF) → ciano (#00D4FF) em 135deg e letra "D" em Space Grotesk bold.

const GRADIENT_DEFS = `
  <defs>
    <linearGradient id="dobbsAccent" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00A3FF"/>
      <stop offset="100%" stop-color="#00D4FF"/>
    </linearGradient>
  </defs>
`

/** Ícone "any" — cantos arredondados, conteúdo até a borda (usado em favicon, atalhos, etc). */
export const iconAnySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${GRADIENT_DEFS}
  <rect width="512" height="512" rx="118" fill="url(#dobbsAccent)"/>
  <text x="256" y="350" text-anchor="middle" fill="#05070A" font-family="'Space Grotesk',Arial,sans-serif" font-size="240" font-weight="700">D</text>
</svg>`

/** Ícone "maskable" — fundo em sangria total, glifo dentro da safe zone (40% de raio central). */
export const iconMaskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${GRADIENT_DEFS}
  <rect width="512" height="512" fill="url(#dobbsAccent)"/>
  <text x="256" y="300" text-anchor="middle" fill="#05070A" font-family="'Space Grotesk',Arial,sans-serif" font-size="168" font-weight="700">D</text>
</svg>`

/** Favicon — fundo sólido (sem gradiente) para máxima legibilidade em tamanhos pequenos (16–32px). */
export const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#00A3FF"/>
  <text x="16" y="22.5" text-anchor="middle" fill="#05070A" font-family="'Space Grotesk',Arial,sans-serif" font-size="16" font-weight="700">D</text>
</svg>`
