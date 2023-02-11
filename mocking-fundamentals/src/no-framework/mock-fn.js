const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

function fn(impl) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = { calls: [] }
  return mockFn
}

const originalGetWinner = utils.getWinner
utils.getWinner = fn((p1, p2) => p1)

const winner = thumbWar('Richard Do', 'Anh Do')
assert.strictEqual(winner, 'Richard Do')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Richard Do', 'Anh Do'],
  ['Richard Do', 'Anh Do'],
])

// cleanup
utils.getWinner = originalGetWinner
