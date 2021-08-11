# node-ssh-extra

[![Build Status](https://travis-ci.com/narekhovhannisyan/node-ssh-extra.svg?branch=master)](https://travis-ci.com/narekhovhannisyan/node-ssh-extra)


[Node SSH](https://github.com/steelbrain/node-ssh) wrapper which helps to reuse existing connections.

This module keeps all connections in cache for further usage. 

Cache eventually checks if `connectionExpire` time is passed. If it is, then it removes connection from cache.

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

// And after if you need to do some other thing on the same server, just call NodeSSHExtra the same way.
// It will re-use the old opened connection if it's not expired, otherwise will create new connection.
```

## Contribution

For contributing please see [contribution rules](doc/CONTRIBUTING.md)

