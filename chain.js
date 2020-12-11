const ToyBlock = require('./block')

class ToyChain {
  constructor () {
    this.blocks = []
    this.createGenesis()
  }

  createGenesis () {
    const block = new ToyBlock('Genesis', '0000000000000000000000000000000000000000000000000000000000000000')
    this.blocks.push(block)
  }

  getPrevHash () {
    const lastBlock = this.blocks[this.blocks.length - 1]
    return lastBlock.hash
  }

  addBlock (data) {
    const prev = this.getPrevHash()
    const newBlock = new ToyBlock(data, prev)
    this.blocks.push(newBlock)
  }

  getBlocks () {
    return this.blocks
  }
}

module.exports = ToyChain
