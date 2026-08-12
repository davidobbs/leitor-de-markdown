import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Gera favicon e ícones do PWA a partir do logo oficial DOBBS (logo-dobbs-icon.png).
// O arquivo-fonte tem fundo transparente; compomos sobre branco para preservar o
// contraste original entre o "E" (navy escuro) e o "D" (gradiente azul→ciano).

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const iconsDir = join(publicDir, 'icons')
const sourceLogo = join(iconsDir, 'logo-dobbs-icon.png')

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

async function composeOnWhite(canvasSize, logoScale) {
  const logoSize = Math.round(canvasSize * logoScale)
  const offset = Math.round((canvasSize - logoSize) / 2)
  const logoBuffer = await sharp(sourceLogo).resize(logoSize, logoSize).toBuffer()

  return sharp({
    create: { width: canvasSize, height: canvasSize, channels: 4, background: WHITE },
  })
    .composite([{ input: logoBuffer, left: offset, top: offset }])
    .png()
    .toBuffer()
}

await mkdir(iconsDir, { recursive: true })

// "any" — logo ocupa ~86% do canvas, pequena margem para respiro visual.
for (const size of [192, 512]) {
  const buffer = await composeOnWhite(size, 0.86)
  await writeFile(join(iconsDir, `icon-${size}.png`), buffer)
}

// "maskable" — margem maior (~70%) para respeitar a safe zone do Android.
const maskableBuffer = await composeOnWhite(512, 0.7)
await writeFile(join(iconsDir, 'icon-512-maskable.png'), maskableBuffer)

// Favicon — versão pequena, quase edge-to-edge para legibilidade em 16–32px.
const faviconBuffer = await composeOnWhite(64, 0.92)
await writeFile(join(publicDir, 'favicon.png'), faviconBuffer)

console.log('Ícones gerados a partir do logo oficial DOBBS (logo-dobbs-icon.png)')
