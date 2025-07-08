// utils/db.ts
import CryptoJS from 'crypto-js'
import { openDB } from 'idb'

const DB_NAME = 'ai_settings_db'
const STORE_NAME = 'settings'
const SECRET = 'your-strong-secret-key' 

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, SECRET).toString()
}

export const decrypt = (ciphertext: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error(error)
    return ''
  }
}

const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    },
  })
}

export const saveSetting = async (key: string, value: string | number) => {
  const db = await getDB()
  await db.put(STORE_NAME, value, key)
}

export const loadSetting = async (key: string) => {
  const db = await getDB()
  return db.get(STORE_NAME, key)
}
