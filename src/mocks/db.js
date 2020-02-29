const storage = {}
const db = {
  async get(key) {
    if (storage[key]) return storage[key]

    throw new Error('key not exist')
  },

  async put(key, value) {
    if (key) storage[key] = `${value instanceof Array ? '[object Object]' : value}`
  },

  async del(key) {
    if (!storage[key]) throw new Error('key not exist')
    storage[key] = null
  }
}

export default db
