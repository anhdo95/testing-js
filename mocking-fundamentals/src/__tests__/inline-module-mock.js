const thumbWar = require('../thumb-war')
const utilsMock = require('../utils')

jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((p1, p2) => p1)
  }
})

test('returns winner', () => {
  const winner = thumbWar('Richard Do', 'Anh Do')
  expect(winner).toBe('Richard Do')
  expect(utilsMock.getWinner.mock.calls).toEqual([
    ['Richard Do', 'Anh Do'],
    ['Richard Do', 'Anh Do']
  ])

  // cleanup
  utilsMock.getWinner.mockReset()
})
