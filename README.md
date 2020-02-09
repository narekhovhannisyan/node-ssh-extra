# node-ssh-extra

[![Build Status](https://travis-ci.com/narekhovhannisyan/node-ssh-extra.svg?branch=master)](https://travis-ci.com/narekhovhannisyan/node-ssh-extra)


[Node SSH](https://github.com/steelbrain/node-ssh) wrapper which helps to reuse existing connections.

All connections are kept in cache and expire after given `connectionExpire` milliseconds.

## Usage

### For separate servers.
```js
const NodeSSHExtra = require('node-ssh-extra')

NodeSSHExtra({
  privateKey, // Private key path for ssh connection.
  host, // name for ssh connection.
  passphrase, // Passphrase for ssh connection.
  username, // User name for ssh connection.
  connectionExpire, // Milliseconds to expire ssh connections.
  domainOrIP // Domain or IP address to connect.
})
  .then((connection) => {
    // Do whatever you need to do here.
  })

```

### If all servers have the same connection credentials.

```js
const NodeSSHExtra = require('node-ssh-extra').NodeSSHExtraForSameCredentials({
  privateKey,
  host,
  passphrase,
  username,
  connectionExpire
})

NodeSSHExtra('mock-domain.com')
  .then((connection) => {
    // Do whatever you need to do here.
  })

// And after if you need to do some other thing on the same server, just call NodeSSHExtra the same way.
// It will reuse the old opened connection if it's not expired, otherwise will create new connection.

NodeSSHExtra('mock-domain.com')
  .then((connection) => {
    // Just continue doing what you need :)
  })

```
