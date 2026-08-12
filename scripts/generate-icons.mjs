import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { iconSvg } from './icon-svg.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconsDir = join(__dirname, '..', 'public', 'icons')

await mkdir(iconsDir, { recursive: true })

for (const size of [192, 512]) {
  const buffer = await sharp(Buffer.from(iconSvg)).resize(size, size).png().toBuffer()
  await writeFile(join(iconsDir, `icon-${size}.png`), buffer)
}

console.log('Icons generated in public/icons/')
