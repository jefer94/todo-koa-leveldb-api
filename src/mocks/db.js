const storage = {}
const db = {
  get: async (key) => {
    if (storage[key])
      return storage[key]

    throw ''
  },

  put: async (key, value) => {
    if (key)
      storage[key] = `${value instanceof Array ? '[object Object]' : value}`
  },

  del: async (key) => {
    if (!storage[key])
      throw ''
    storage[key] = null
  }
}

export default db