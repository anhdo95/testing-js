import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../app'
import {submitForm as mockSubmitForm} from '../api'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  const testData = { food: 'Test food', drink: 'Test drink' }
  mockSubmitForm.mockResolvedValueOnce({ success: true })

  render(<App />)

  userEvent.click(screen.getByText(/fill.*form/i))
  
  userEvent.type(screen.getByLabelText(/food/i), testData.food)
  userEvent.click(screen.getByText(/next/i))

  userEvent.type(screen.getByLabelText(/drink/i), testData.drink)
  userEvent.click(screen.getByText(/review/i))

  expect(screen.getByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(screen.getByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  userEvent.click(screen.getByText(/confirm/i, { selector: 'button' }))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  userEvent.click(await screen.findByText(/home/i))

  expect(screen.getByText(/home/i)).toBeInTheDocument()

  mockSubmitForm.mockRestore()
})

test('Can display an error page during confirm', async () => {
  const testMessage = 'Test message'
  const testData = { food: 'Test food', drink: 'Test drink' }
  mockSubmitForm.mockRejectedValueOnce({ message: testMessage })

  render(<App />)

  userEvent.click(screen.getByText(/fill.*form/i))
  
  userEvent.type(screen.getByLabelText(/food/i), testData.food)
  userEvent.click(screen.getByText(/next/i))

  userEvent.type(screen.getByLabelText(/drink/i), testData.drink)
  userEvent.click(screen.getByText(/review/i))

  expect(screen.getByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(screen.getByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  userEvent.click(screen.getByText(/confirm/i, { selector: 'button' }))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  userEvent.click(await screen.findByText(testMessage))

  mockSubmitForm.mockRestore()
})
