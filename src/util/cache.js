/**
 * @typedef {import('../types/cache').TCacheMethods} TCacheMethods
 */

/**
 * Key-value based cache with expire feature.
 * @returns {TCacheMethods}
 */
const Cache = () => {
  const storage = {}

  /**
   * Checks if the key is close to expire.
   * @private
   */
  setInterval(() => {
    const now = Date.now()
    for (const key in storage) {
      const { date, expire } = storage[key]
      if (now - date > expire) {
        delete storage[key]
      }
    }
  }, 1000 * 60 * 2)

  /**
   * Gets data from cache by given `key`.
   * In case if data is expired returns `null`.
   * @param {String} key The key for storing data.
   * @returns {any}
   */
  const getValueBy = (key) => storage[key] ? storage[key].value : undefined

  /**
   * Stores data with given `key`, `expire` and `value`
   * @param {String} key The key for storing data.
   * @param {Number} [expire] The seconds to expire.
   * @returns {(any) => any}
   */
  const store = (key, expire = Infinity) => (value) => {
    storage[key] = {}
    storage[key].value = value
    storage[key].date = Date.now()
    storage[key].expire = expire

    return getValueBy(key)
  }

  /**
   * Get stored keys.
   * @returns {String[]}
   */
  const getKeys = () => Object.keys(storage)

  /**
   * Gets all key value pairs from cache.
   * @returns {any[]} Array of key value pairs.
   */
  const getKeyValuePairs = () => getKeys().map((key) => ({ key, value: storage[key].value }))

  return {
    getValueBy,
    getValueByAsync: (key) => Promise.resolve(getValueBy(key)),
    store,
    getKeys,
    getKeyValuePairs
  }
}

/**
 * Export singleton instance.
 */
module.exports = {
  CLASS: Cache,
  SINGLETON: Cache()
}
