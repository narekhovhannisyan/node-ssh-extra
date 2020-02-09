const NodeSSH = require('node-ssh')

const { getValueByAsync, store } = require('./util/cache').SINGLETON

/**
 * @typedef {import('./types/ssh').TNodeSSH} TNodeSSH
 * @typedef {import('./types/ssh').TSSHConnectionOptions} TSSHConnectionOptions
 * @typedef {import('./types/ssh').TSSHConnectionOptionsWithDomain} TSSHConnectionOptionsWithDomain
 */

/**
 * Provides new SSH connection if there is no such one, otherwise creates new one and stores in cache.
 * @param {TSSHConnectionOptionsWithDomain} sshOptionsWithDomain SSH connection options.
 * @return {Promise.<TNodeSSH>} SSH connection to desired remote.
 */
const connect = ({ domainOrIP, connectionExpire, ...sshOptions }) =>
  getValueByAsync(domainOrIP).then((connection) => {
    if (!connection) {
      return new NodeSSH()
        .connect(sshOptions)
        .then(store(domainOrIP, connectionExpire))
    }

    return connection
  })

/**
 * Reusable Node SSH connection for different remotes with same connection credentials.
 * @param {TSSHConnectionOptions} sshOptions The connection options.
 * @return {(domainOrIP: String) => Promise.<TNodeSSH>} SSH Session.
 */
const NodeSSHExtraForSameCredentials = (sshOptions) => (domainOrIP) => connect({ ...sshOptions, domainOrIP })

/**
 * Reusable Node SSH connection.
 * @param {TSSHConnectionOptionsWithDomain} sshOptionsWithDomain
 * @returns {Promise.<TNodeSSH>}
 */
const NodeSSHExtra = (sshOptionsWithDomain) => connect(sshOptionsWithDomain)

module.exports = {
  NodeSSHExtraForSameCredentials,
  NodeSSHExtra
}
