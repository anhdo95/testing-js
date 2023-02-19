import React from 'React'
import {render} from '@testing-library/react'
import {ErrorBoundary} from '../error-boundary'
import {reportError as reportErrorMock} from '../api'

jest.mock('../api')

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => jest.clearAllMocks())

afterAll(() => {
  console.error.mockRestore()
})

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  }
  return null
}

test('calls reportError and renders that there was a problem', () => {
  reportErrorMock.mockResolvedValueOnce({success: true})
  const {rerender} = render(<Bomb />, {wrapper: ErrorBoundary})
  rerender(<Bomb shouldThrow />)

  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(reportErrorMock).toHaveBeenCalledWith(error, info)
  expect(reportErrorMock).toHaveBeenCalledTimes(1)
  expect(console.error).toHaveBeenCalledTimes(2) // one for js dom, another for react dom
})
