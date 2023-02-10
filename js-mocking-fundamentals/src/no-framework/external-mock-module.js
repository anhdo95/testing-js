
require('../__no-framework-mocks__/utils')
const utilsPath = require.resolve('../utils')
const mockUtilsPath = require.resolve('../__no-framework-mocks__/utils')
require.cache[utilsPath] = require.cache[mockUtilsPath]

const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

const winner = thumbWar('Richard Do', 'Anh Do')
assert.strictEqual(winner, 'Richard Do')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Richard Do', 'Anh Do'],
  ['Richard Do', 'Anh Do']
])

// cleanup
delete require.cache[utilsPath]
