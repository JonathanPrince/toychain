const sha256 = require('../utils/hash')
const uid = require('../utils/uid')

class Transaction {
  constructor (data) {
    this.from = data.from
    this.to = data.to
    this.value = data.value
    this.uid = uid()
    this.hash = sha256(this.toString())
  }

  toString () {
    return JSON.stringify(this, null, 2)
  }
}

module.exports = Transaction
