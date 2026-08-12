import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import {
  DB_NAME,
  DB_VERSION,
  STORE_NAME,
  buildPreview,
  createFileId,
  type StoredFile,
} from './file-utils'

interface LeitorDB extends DBSchema {
  files: {
    key: string
    value: StoredFile
    indexes: { 'by-openedAt': number }
  }
}

let dbPromise: Promise<IDBPDatabase<LeitorDB>> | null = null

export function getDb(): Promise<IDBPDatabase<LeitorDB>> {
  if (!dbPromise) {
    dbPromise = openDB<LeitorDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('by-openedAt', 'openedAt')
      },
    })
  }
  return dbPromise
}

export async function saveFile(
  name: string,
  content: string,
  id?: string,
): Promise<StoredFile> {
  const db = await getDb()
  const record: StoredFile = {
    id: id ?? createFileId(),
    name,
    content,
    preview: buildPreview(content),
    openedAt: Date.now(),
  }
  await db.put(STORE_NAME, record)
  return record
}

export async function getFile(id: string): Promise<StoredFile | undefined> {
  const db = await getDb()
  return db.get(STORE_NAME, id)
}

export async function listRecentFiles(limit = 20): Promise<StoredFile[]> {
  const db = await getDb()
  const all = await db.getAllFromIndex(STORE_NAME, 'by-openedAt')
  return all.reverse().slice(0, limit)
}

export async function deleteFile(id: string): Promise<void> {
  const db = await getDb()
  await db.delete(STORE_NAME, id)
}

export async function touchFile(id: string): Promise<void> {
  const file = await getFile(id)
  if (!file) return
  file.openedAt = Date.now()
  const db = await getDb()
  await db.put(STORE_NAME, file)
}
