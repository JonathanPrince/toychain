const ToyChain = require('./chain')
const bc = new ToyChain()

console.log('Genesis Block:', bc.getBlocks())

bc.addBlock('Second')
bc.addBlock('Third')

console.log(bc.getBlocks())
