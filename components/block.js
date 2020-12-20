const sha256 = require('../utils/hash')

class ToyBlock {
  constructor (data, prev) {
    this.hash = ''
    this.timestamp = new Date().toISOString()
    this.prev = prev
    this.nonce = 0
    this.transactions = data
    this.mineHash()
  }

  isValidHash (hash) {
    return (hash.indexOf('000') === 0)
  }

  mineHash () {
    let blockHash = ''

    while (!this.isValidHash(blockHash)) {
      this.nonce++
      blockHash = sha256(this.toString())
    }
    this.hash = blockHash
  }

  toString () {
    const blockData = {
      timestamp: this.timestamp,
      prev: this.prev,
      transactions: this.transactions,
      nonce: this.nonce
    }
    return JSON.stringify(blockData, null, 2)
  }
}

module.exports = ToyBlock
