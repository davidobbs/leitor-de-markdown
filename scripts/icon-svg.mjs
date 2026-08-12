// Marca "Leitor MD" — reaproveita o sistema visual do site dobbs.com.br:
// quadrado com gradiente accent-500 (#14F4C9) → accent-600 (#06B6D4) e letra em Space Grotesk bold.

const GRADIENT_DEFS = `
  <defs>
    <linearGradient id="dobbsAccent" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#14F4C9"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>
`

/** Ícone "any" — cantos arredondados, conteúdo até a borda (usado em favicon, atalhos, etc). */
export const iconAnySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${GRADIENT_DEFS}
  <rect width="512" height="512" rx="118" fill="url(#dobbsAccent)"/>
  <text x="256" y="350" text-anchor="middle" fill="#0B1020" font-family="'Space Grotesk',Arial,sans-serif" font-size="240" font-weight="700">M</text>
</svg>`

/** Ícone "maskable" — fundo em sangria total, glifo dentro da safe zone (40% de raio central). */
export const iconMaskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${GRADIENT_DEFS}
  <rect width="512" height="512" fill="url(#dobbsAccent)"/>
  <text x="256" y="300" text-anchor="middle" fill="#0B1020" font-family="'Space Grotesk',Arial,sans-serif" font-size="168" font-weight="700">M</text>
</svg>`

/** Favicon — fundo sólido (sem gradiente) para máxima legibilidade em tamanhos pequenos (16–32px). */
export const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#14F4C9"/>
  <text x="16" y="22.5" text-anchor="middle" fill="#0B1020" font-family="'Space Grotesk',Arial,sans-serif" font-size="16" font-weight="700">M</text>
</svg>`
