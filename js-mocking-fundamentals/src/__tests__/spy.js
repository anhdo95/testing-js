const thumbWar = require('../thumb-war')
const utils = require('../utils')

test('returns winner', () => {
  jest.spyOn(utils, 'getWinner')

  utils.getWinner.mockImplementation((p1, p2) => p1)

  const winner = thumbWar('Richard Do', 'Anh Do')
  expect(winner).toBe('Richard Do')
  expect(utils.getWinner.mock.calls).toEqual([
    ['Richard Do', 'Anh Do'],
    ['Richard Do', 'Anh Do']
  ])

  // cleanup
  utils.getWinner.mockRestore()
})
