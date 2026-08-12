import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveFile } from '../lib/storage'
import { isMarkdownFile, readFileAsText } from '../lib/file-utils'
import { consumeSharePendingId, readShareRedirectFromUrl } from '../lib/share-handler'

export function FileLaunchHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    const sharedId = readShareRedirectFromUrl() ?? consumeSharePendingId()
    if (sharedId) {
      navigate(`/read/${sharedId}`, { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    if (!('launchQueue' in window) || !window.launchQueue) return

    window.launchQueue.setConsumer(async (launchParams) => {
      const handles = launchParams.files
      if (!handles?.length) return

      try {
        const handle = handles[0]
        const file = await handle.getFile()
        if (!isMarkdownFile(file)) return

        const content = await readFileAsText(file)
        const saved = await saveFile(file.name, content)
        navigate(`/read/${saved.id}`, { replace: true })
      } catch (error) {
        console.error('Failed to open launched file', error)
      }
    })
  }, [navigate])

  return null
}
