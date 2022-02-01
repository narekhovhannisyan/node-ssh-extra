const NodeSSH = require('node-ssh')

const { getValueByAsync, store } = require('./util/cache').SINGLETON

/**
 * @typedef {import('node-ssh')} NodeSSH
 * @typedef {import('./types/ssh').TSSHOptions} TSSHOptions
 * @typedef {import('./types/ssh').TSSHConnectionOptions} TSSHConnectionOptions
 */

/**
 * SSH connection wrapper which uses cache for storing connections.
 * @param {TSSHConnectionOptions} param0
 * @return {() => Promise.<NodeSSH>} SSH Session.
 */
const SSHCache = ({ domainOrIP, connectionExpire, ...sshOptions }) => {
  /**
   * Provides new SSH connection if there is no such one, otherwise creates new one and stores in cache.
   * @param {String} domainOrIP The remote server domain.
   * @return {Promise.<NodeSSH>} SSH connection.
   */
  const connect = (domainOrIP) => getValueByAsync(domainOrIP)
    .then((connection) => {
      if (!connection) {
        return new NodeSSH().connect(sshOptions)
          .then(store(domainOrIP, connectionExpire))
      }

      return connection
    })

  return () => connect(domainOrIP)
}

module.exports = SSHCache
