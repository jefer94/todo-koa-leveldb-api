import levelup from 'levelup'
import leveldown from 'leveldown'

let db
let instance = false
let mocking = false

function startDb() {
  if (!instance && !mocking) db = levelup(leveldown('./.storage'))

  instance = true
}

export async function mockDb(mock) {
  try {
    db = mock
    mocking = true
    instance = true
  }
  catch (e) {}
}

export function get(key) {
  startDb()
  return db.get(key)
}

export function put(key, value) {
  startDb()
  return db.put(key, value)
}

export function del(key) {
  startDb()
  return db.del(key)
}
