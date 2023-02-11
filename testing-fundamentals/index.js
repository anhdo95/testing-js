// sum is intentionally broken so you can see errors in the tests
const sum = (a, b) => a - b
const subtract = (a, b) => a - b

// these are kinda pointless I know, but it's just to simulate an async function
const sumAsync = (...args) => Promise.resolve(sum(...args))
const subtractAsync = (...args) => Promise.resolve(subtract(...args))

test(`Sum adds two numbers`, async () => {
  const result = await sumAsync(5, 2)
  const expected = 7
  expect(result).toBe(expected)
})

test(`Sum subtracts two numbers`, async () => {
  const result = await subtractAsync(5, 2)
  const expected = 3
  expect(result).toBe(expected)
})

