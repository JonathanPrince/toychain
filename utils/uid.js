const crypto = require('crypto')

function uid () {
  return crypto.randomBytes(32).toString('hex')
}

module.exports = uid
