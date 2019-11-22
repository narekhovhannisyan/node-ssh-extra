const storage = {}

/**
 * Key-value based cache with expire feature.
 */
const Cache = () => {
  /**
   * Checks if the key is close to expire.
   * @private
   */
  const timer = setInterval(() => {
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
  const getFromCache = (key) => storage[key] ? storage[key].value : undefined

  /**
   * Stores data with given `key`, `expire` and `value`
   * @param {String} key The key for storing data.
   * @param {Number} [expire] The seconds to expire.
   * @returns {(any) => any}
   */
  const storeInCache = (key, expire = Infinity) => (value) => {
    storage[key] = {}
    storage[key].value = value
    storage[key].date = Date.now()
    storage[key].expire = expire

    return getFromCache(key)
  }

  /**
   * Stops searching for values to expire.
   */
  const stopCache = () => clearInterval(timer)

  /**
   * Get stored keys.
   * @returns {String[]}
   */
  const getKeys = () => Object.keys(storage)

  /**
   * Gets all key value pairs from cache.
   * @returns {Array} Array of key value pairs.
   */
  const getKeyValuePairs = () => getKeys().map((key) => storage[key].value)

  return {
    getFromCache,
    getFromCacheAsync: (key) => Promise.resolve(getFromCache(key)),
    storeInCache,
    stopCache,
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
