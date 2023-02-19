import * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {loadGreeting as mockLoadGreeting} from '../api'
import {GreetingLoader} from '../greeting-loader-01-mocking'

jest.mock('../api')

test('loads greetings on click', async () => {
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})

  render(<GreetingLoader />)
  const nameInput = screen.getByLabelText(/name/i)
  userEvent.type(nameInput, 'Richard')
  userEvent.click(screen.getByText(/load greeting/i))
  expect(mockLoadGreeting).toHaveBeenCalledWith('Richard')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)

  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})
