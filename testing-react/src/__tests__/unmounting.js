import * as React from 'react'
import {render, act} from '@testing-library/react'
import {Countdown} from '../countdown'



beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers()
})

afterAll(() => {
  console.error.mockRestore()
})

test('does not attempt to state when unmounted (to prevent memory leaks)', () => {
  jest.useFakeTimers()
  const { unmount } = render(<Countdown />)
  unmount()

  act(() => jest.runOnlyPendingTimers())

  expect(console.error).not.toHaveBeenCalled()
})
