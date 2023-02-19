import * as React from 'react'
import { Provider } from 'react-redux'
import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Counter} from '../redux-counter'
import {store} from '../redux-store'

function render(ui, options = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

test('can render with redux with defaults', () => {
  render(<Counter />)
  const increaseButton = screen.getByText(/\+/)
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('0')
  userEvent.click(increaseButton)
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('1')
})
