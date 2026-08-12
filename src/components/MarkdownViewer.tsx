import { useEffect, useRef } from 'react'
import '../styles/reader.css'

interface MarkdownViewerProps {
  html: string
  fontSize: number
}

export function MarkdownViewer({ html, fontSize }: MarkdownViewerProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const blocks = container.querySelectorAll('pre')
    blocks.forEach((pre) => {
      if (pre.parentElement?.classList.contains('code-block-wrapper')) return

      const wrapper = document.createElement('div')
      wrapper.className = 'code-block-wrapper'
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      const button = document.createElement('button')
      button.type = 'button'
      button.className =
        'code-copy-btn rounded-md bg-white/10 px-2 py-1 text-xs text-white hover:bg-white/20'
      button.textContent = 'Copiar'
      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? ''
        await navigator.clipboard.writeText(code)
        button.textContent = 'Copiado!'
        setTimeout(() => {
          button.textContent = 'Copiar'
        }, 1500)
      })
      wrapper.appendChild(button)
    })
  }, [html])

  return (
    <article
      ref={containerRef}
      className="markdown-body"
      style={{ ['--reader-scale' as string]: fontSize / 100 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
