const ToyBlock = require('./block')
const Queue = require('../utils/queue')
const Transaction = require('./transaction')
const MerkleTree = require('../utils/merkle')

class ToyChain {
  constructor (state) {
    this.blocks = this.blocks || []
    if (!this.blocks.length) {
      this.createGenesis()
    }
    this.memPool = new Queue()
  }

  createGenesis () {
    const block = new ToyBlock('Genesis', '0000000000000000000000000000000000000000000000000000000000000000')
    this.blocks.push(block)
  }

  getPrevHash () {
    const lastBlock = this.blocks.slice(-1)
    return lastBlock.hash
  }

  addBlock (data) {
    const prev = this.getPrevHash()
    const newBlock = new ToyBlock(data, prev)
    this.blocks.push(newBlock)
    return newBlock.hash
  }

  getBlocks () {
    return this.blocks
  }

  addTransaction (txData) {
    const tx = new Transaction(txData)
    this.memPool.enqueue(tx)
    console.log('Tx added to memPool: ', tx.hash)
    return tx.hash
  }

  processTransactions () {
    console.log('Processing Transactions...')
    const txList = []

    for (let i = 0; i < 5; i++) {
      if (this.memPool.isEmpty()) break

      const tx = this.memPool.dequeue()
      txList.push(tx)
    }
    const merkleTree = new MerkleTree()
    merkleTree.createTree(txList)
    console.log('Added Block:', this.addBlock(merkleTree))
  }
}

module.exports = ToyChain
