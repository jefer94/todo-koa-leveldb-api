import levelup from 'levelup'
import leveldown from 'leveldown'

console.log(1)
// 1) Create our store
let db = levelup(leveldown('./.storage'))
console.log(2)

export function mockDb(mock) {
  console.log('mock', mock)
  db = mock
}

function getDb() {
  return db
}

export async function get(key) {
  console.log(3)
  return await getDb().get(key)
  console.log(4)
}

export async function put(key, value) {
  return await getDb().put(key, value)
}

export async function del(key) {
  return await getDb().del(key)
}