/**
 * Exec command argument type.
 * @typedef {Object} TExecCommandArgs
 * @property {String} command
 * @property {Object} options
 * @private
 */

/**
 * SSH execCommand response stream.
 * @typedef {Object} TStreamResponse
 * @property {String} stdout
 * @property {String} stderr
 * @property {Number} code
 * @private
 */

/**
 * Node SSH instance.
 * @typedef {Object} TNodeSSH
 * @property {() => Promise.<TStreamResponse>} execCommand
 * @property {() => void} dispose
 * @property {() => any} connect
 * @property {Function} putDirectory
 * @property {Function} putFiles
 * @property {Function} putFile
 * @property {Function} getFile
 * @property {Function} exec
 * @property {Function} mkdir
 * @property {Function} requestSFTP
 * @property {Function} requestShell
 */

/**
 * SSH connection args.
 * @typedef {Object} TSSHConnectionOptions
 * @property {String} privateKey Private key path for ssh connection.
 * @property {String} host Host name for ssh connection.
 * @property {String} passphrase Passphrase for ssh connection.
 * @property {String} username User name for ssh connection.
 * @property {Number} connectionExpire Milliseconds to expire ssh connections.
 */

/**
 * @typedef {TSSHConnectionOptions & {domainOrIP: String}} TSSHConnectionOptionsWithDomain
 */

module.exports = {}
