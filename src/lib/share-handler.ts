import {
  DB_NAME,
  DB_VERSION,
  STORE_NAME,
  buildPreview,
  createFileId,
  type StoredFile,
} from './file-utils'

/** IndexedDB helpers usable from the service worker (no idb dependency). */
export function openShareDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('by-openedAt', 'openedAt')
      }
    }
  })
}

export async function saveSharedFileInSw(
  name: string,
  content: string,
): Promise<string> {
  const db = await openShareDb()
  const id = createFileId()
  const record: StoredFile = {
    id,
    name,
    content,
    preview: buildPreview(content),
    openedAt: Date.now(),
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.oncomplete = () => {
      db.close()
      resolve(id)
    }
    tx.onerror = () => reject(tx.error)
    tx.objectStore(STORE_NAME).put(record)
  })
}

export const SHARE_PENDING_KEY = 'leitor-share-pending'

export function setSharePendingId(id: string): void {
  sessionStorage.setItem(SHARE_PENDING_KEY, id)
}

export function consumeSharePendingId(): string | null {
  const id = sessionStorage.getItem(SHARE_PENDING_KEY)
  if (id) sessionStorage.removeItem(SHARE_PENDING_KEY)
  return id
}

export function readShareRedirectFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search)
  return params.get('shared')
}
