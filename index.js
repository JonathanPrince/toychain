const ToyChain = require('./components/chain')
const bc = new ToyChain()

bc.addTransaction({
  from: 'A',
  to: 'B',
  value: 1
})
bc.addTransaction({
  from: 'B',
  to: 'C',
  value: 1
})
bc.addTransaction({
  from: 'C',
  to: 'A',
  value: 1
})
bc.addTransaction({
  from: 'A',
  to: 'B',
  value: 1
})
bc.addTransaction({
  from: 'B',
  to: 'C',
  value: 1
})
bc.addTransaction({
  from: 'C',
  to: 'A',
  value: 1
})
bc.processTransactions()

const blocks = bc.getBlocks()
console.log('Blocks: ', JSON.stringify(blocks, null, 2))
