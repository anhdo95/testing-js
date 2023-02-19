import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  window.history.pushState({}, 'Home page', '/')
  render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>,
  )
  
  expect(screen.getByRole('heading')).toHaveTextContent(/home/i)

  userEvent.click(screen.getByText(/about/i))
  expect(screen.getByRole('heading')).toHaveTextContent(/about/i)
})
