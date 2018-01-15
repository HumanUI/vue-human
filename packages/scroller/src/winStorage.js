let ls = null

export default {
  setSotageType (storage) {
    if (!window[storage]) {
      throw new TypeError(`[winstorage]: ${storage} is not defined in window。`)
    }
    ls = window[storage]
  },
  getItem (key) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch (err) {
      throw err
    }
  },
  setItem (key, val) {
    ls.setItem(key, JSON.stringify(val))
  },
  clear () {
    ls.clear()
  },
  keys () {
    return ls.keys()
  },
  removeItem (key) {
    ls.removeItem(key)
  }
}
