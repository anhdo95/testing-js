const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

const originalGetWinner = utils.getWinner
utils.getWinner = (player1, player2) => player1

const actual = thumbWar('Richard Do', 'Anh Do')
assert.strictEqual(actual, 'Richard Do')

// cleanup
utils.getWinner = originalGetWinner
