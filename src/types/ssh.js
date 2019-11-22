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
 */

/**
 * SSH connection args.
 * @typedef {Object} TSSHConnectionOptions
 * @property {String} privateKey
 * @property {String} host
 * @property {String} passphrase
 * @property {String} username
 */

module.exports = {}
