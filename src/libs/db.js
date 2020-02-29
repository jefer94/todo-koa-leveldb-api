import levelup from 'levelup'
import leveldown from 'leveldown'

// 1) Create our store
let db
let instance = false
let mocking = false

function startDb() {
  if (!instance && !mocking)
    db = levelup(leveldown('./.storage'))
  
  instance = true
}

export async function mockDb(mock) {
  try {
    // if (db.close)
    //   await db.close()
    db = mock
    mocking = true
    instance = true
  }
  catch(e) {}
}

function getDb() {
  return db
}

export async function get(key) {
  startDb()
  return await db.get(key)
}

export async function put(key, value) {
  startDb()
  return await db.put(key, value)
}

export async function del(key) {
  startDb()
  return await db.del(key)
}