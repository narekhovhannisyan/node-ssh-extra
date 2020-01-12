const NodeSSH = require('node-ssh')

const { SSH } = require('./config')
const { CONNECTION_EXPIRE } = SSH

const { getFromCacheAsync, storeInCache } = require('./util/cache').SINGLETON

/**
 * @typedef {import('./types/ssh').TNodeSSH} TNodeSSH
 * @typedef {import('./types/ssh').TSSHConnectionOptions} TSSHConnectionOptions
 */

/**
 * SSH connection wrapper which uses cache for storing connections.
 * @param {TSSHConnectionOptions} param0 SSH connection options.
 * @return {(domainOrIP: String) => Promise.<TNodeSSH>} SSH Session.
 */
const SSHCache = ({ host, username, privateKey, passphrase }) => domainOrIP => {
  /**
   * Creates options for further `SSH` connection.
   * @param {String} domainOrIP The remote server domain.
   * @return {TSSHConnectionOptions} `SSH` connection options.
   * @private
   */
  const sshOptions = domainOrIP => ({
    host,
    username,
    privateKey,
    passphrase
  })

  /**
   * Provides new SSH connection if there is no such one, otherwise creates new one and stores in cache.
   * @param {String} domainOrIP The remote server domain.
   * @return {Promise.<any>} SSH connection.
   */
  const connect = domainOrIP =>
    getFromCacheAsync(domainOrIP).then(connection => {
      if (!connection) {
        return new NodeSSH()
          .connect(sshOptions(domainOrIP))
          .then(storeInCache(domainOrIP, CONNECTION_EXPIRE))
      }

      return connection
    })

  return connect(domainOrIP)
}

module.exports = SSHCache
