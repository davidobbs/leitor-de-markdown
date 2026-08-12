import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { iconAnySvg, iconMaskableSvg, faviconSvg } from './icon-svg.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const iconsDir = join(publicDir, 'icons')

await mkdir(iconsDir, { recursive: true })

for (const size of [192, 512]) {
  const buffer = await sharp(Buffer.from(iconAnySvg)).resize(size, size).png().toBuffer()
  await writeFile(join(iconsDir, `icon-${size}.png`), buffer)
}

const maskableBuffer = await sharp(Buffer.from(iconMaskableSvg)).resize(512, 512).png().toBuffer()
await writeFile(join(iconsDir, 'icon-512-maskable.png'), maskableBuffer)

await writeFile(join(publicDir, 'favicon.svg'), faviconSvg)

console.log('Ícones da marca DOBBS gerados em public/icons/ e public/favicon.svg')
