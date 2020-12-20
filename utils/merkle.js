const sha256 = require('../utils/hash')

class MerkleTree {
  constructor () {
    this.data = []
  }

  createTree (txList) {
    this.data.unshift(txList)
    this.data.unshift(txList.map(tx => tx.hash))

    while (this.data[0].length > 1) {
      const firstDataEl = this.data[0]
      let temp = []

      for (let i = 0; i < firstDataEl.length; i += 2) {
        if ((i < firstDataEl.length - 1) && (i % 2 === 0)) {
          temp.push(sha256(firstDataEl[i] + firstDataEl[i + 1]))
        } else {
          temp.push(firstDataEl[i])
        }
      }
      this.data.unshift(temp)
    }
    this.rootHash = this.data[0][0]
    this.txCount = this.data[this.data.length - 1].length
  }

  verify (txHash) {
    let cursor = this.data.slice(-1)[0].findIndex(t => txHash === t.hash)

    if (!cursor) return false

    let tempHash = txHash
    for (let i = this.data.length - 2; i > 0; i--) {
      let neighbor = null
      if (cursor % 2 === 0) {
        neighbor = this.data[i][cursor + 1]
        cursor = Math.floor(cursor / 2)
        tempHash = sha256(tempHash + neighbor)
      } else {
        neighbor = this.data[i][cursor - 1]
        cursor = Math.floor((cursor - 1) / 2)
        tempHash = sha256(neighbor + tempHash)
      }
    }
    return tempHash === this.rootHash
  }

  toString () {
    return JSON.stringify(this, null, 2)
  }
}

module.exports = MerkleTree
