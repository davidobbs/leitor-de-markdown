import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Gera favicon, ícones do PWA e a variante "dark" do logo oficial DOBBS
// (logo-dobbs-icon.png) para uso direto sobre o fundo quase-preto do app.
//
// O arquivo-fonte tem fundo transparente e o "E" em navy quase-preto — ótimo
// sobre branco, mas invisível sobre #05070a. Em vez de colocar uma placa clara
// atrás (o que sempre "lê" como branco), recolorimos os pixels escuros do "E"
// para o texto principal da paleta (#f5f7fa) e mantemos o "D" azul→ciano
// intacto. O resultado funciona nativamente sobre o fundo da marca.

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const iconsDir = join(publicDir, 'icons')
const sourceLogo = join(iconsDir, 'logo-dobbs-icon.png')

const DARK_PIXEL_THRESHOLD = 70 // abaixo disso em R, G e B → é o "E" navy, não o "D" azul/ciano
const LIGHT_TEXT = { r: 0xf5, g: 0xf7, b: 0xfa } // --color-dobbs-text
const BRAND_BG = { r: 0x05, g: 0x07, b: 0x0a, alpha: 1 } // --color-dobbs-bg

/** Recolore os pixels quase-pretos do "E" para o tom de texto claro da paleta, preservando o "D". */
async function buildDarkModeLogo() {
  const { data, info } = await sharp(sourceLogo).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    if (a > 0 && r < DARK_PIXEL_THRESHOLD && g < DARK_PIXEL_THRESHOLD && b < DARK_PIXEL_THRESHOLD) {
      data[i] = LIGHT_TEXT.r
      data[i + 1] = LIGHT_TEXT.g
      data[i + 2] = LIGHT_TEXT.b
    }
  }

  return sharp(data, { raw: { width, height, channels } }).png().toBuffer()
}

async function composeOnBrandBg(logoBuffer, canvasSize, logoScale) {
  const logoSize = Math.round(canvasSize * logoScale)
  const offset = Math.round((canvasSize - logoSize) / 2)
  const resizedLogo = await sharp(logoBuffer).resize(logoSize, logoSize).toBuffer()

  return sharp({
    create: { width: canvasSize, height: canvasSize, channels: 4, background: BRAND_BG },
  })
    .composite([{ input: resizedLogo, left: offset, top: offset }])
    .png()
    .toBuffer()
}

await mkdir(iconsDir, { recursive: true })

const darkModeLogo = await buildDarkModeLogo()

// Versão transparente recolorida — usada diretamente no header/hero do app (sem placa).
await writeFile(join(iconsDir, 'logo-dobbs-icon-dark.png'), darkModeLogo)

// "any" — logo sobre o fundo real da marca (#05070a), ~86% do canvas.
for (const size of [192, 512]) {
  const buffer = await composeOnBrandBg(darkModeLogo, size, 0.86)
  await writeFile(join(iconsDir, `icon-${size}.png`), buffer)
}

// "maskable" — margem maior (~70%) para respeitar a safe zone do Android.
const maskableBuffer = await composeOnBrandBg(darkModeLogo, 512, 0.7)
await writeFile(join(iconsDir, 'icon-512-maskable.png'), maskableBuffer)

// Favicon — versão pequena, quase edge-to-edge para legibilidade em 16–32px.
const faviconBuffer = await composeOnBrandBg(darkModeLogo, 64, 0.92)
await writeFile(join(publicDir, 'favicon.png'), faviconBuffer)

console.log('Ícones gerados a partir do logo oficial DOBBS (variante dark, fundo #05070a)')
