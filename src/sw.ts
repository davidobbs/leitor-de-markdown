/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { saveSharedFileInSw } from './lib/share-handler'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

async function handleSharePost(request: Request): Promise<Response> {
  try {
    const formData = await request.formData()
    let file: File | null = null

    for (const [, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        file = value
        break
      }
    }

    if (!file) {
      return Response.redirect('/', 303)
    }

    const content = await file.text()
    const name = file.name || 'documento.md'
    const id = await saveSharedFileInSw(name, content)

    return Response.redirect(`/read/${id}?from=share`, 303)
  } catch (error) {
    console.error('[SW] share handler failed', error)
    return Response.redirect('/?error=share', 303)
  }
}

self.addEventListener('fetch', (event: FetchEvent) => {
  const url = new URL(event.request.url)

  if (event.request.method === 'POST' && url.pathname === '/share') {
    event.respondWith(handleSharePost(event.request))
  }
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
