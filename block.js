const crypto = require('crypto')

class ToyBlock {
  constructor (data, prev) {
    this.timestamp = new Date().toISOString()
    this.data = data
    this.prev = prev
    this.mineHash()
  }

  isValidHash (hash) {
    return (hash.indexOf('000') === 0)
  }

  mineHash () {
    let nonce = 0
    let hash = ''

    while (!this.isValidHash(hash)) {
      hash = crypto.createHash('sha256').update(this.toString() + nonce).digest('hex')
      nonce++
    }
    this.hash = hash
  }

  toString () {
    return `${this.timestamp} ${this.data} ${this.prev}`
  }
}

module.exports = ToyBlock
