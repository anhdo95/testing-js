import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
  const { rerender, getByLabelText, getByRole, debug } = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  userEvent.type(input, '10')
  expect(input).toHaveValue(10)
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  rerender(<FavoriteNumber max={10} />)
  expect(screen.queryByRole('alert')).toBeNull()
})
