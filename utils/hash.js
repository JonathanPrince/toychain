const crypto = require('crypto')

function hash (data) {
  if (data == null) return ''

  return crypto.createHash('sha256').update(data.toString()).digest('hex')
}

module.exports = hash
