const storage = {}
const db = {
  get: async (key) => {
    if (storage[key])
      return storage[key]

    // throw ''
  },

  put: async (key, value) => {
    if (key)
      storage[key] = `${value}`
  },

  del: async (key) => {
    storage[key] = null
  }
}

export default db