import * as React from 'react'
import {Redirect as MockRedirect} from 'react-router'
import {render, screen, waitFor} from '@testing-library/react'
import {sequence, build, fake} from 'test-data-bot';
import userEvent from '@testing-library/user-event'
import {Editor} from '../post-editor-01-markup'
import {savePost as mockSavePost } from '../api'

const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r|\n/g, '')),
  tags: fake(f => [f.lorem.words(), f.lorem.words(), f.lorem.words()])
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`)
})

jest.mock('../api')

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null)
  }
})

afterAll(() => jest.clearAllMocks())

function renderEditor() {
  const fakeUser = userBuilder()
  const fakePost = postBuilder()
  const utils = render(<Editor user={fakeUser} />)

  userEvent.type(screen.getByLabelText(/title/i), fakePost.title) 
  userEvent.type(screen.getByLabelText(/content/i), fakePost.content)
  userEvent.type(screen.getByLabelText(/tags/i), fakePost.tags.join(','))
  const submitButton = screen.getByText(/submit/i)

  return {
    ...utils,
    fakeUser,
    fakePost,
    submitButton
  }
}

test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const { fakePost, fakeUser, submitButton } = renderEditor()
  const preDate = new Date().getTime()
  
  userEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    createdAt: expect.any(Date),
    authorId: fakeUser.id
  })
  const postDate = new Date().getTime()
  const createdAt = new Date(mockSavePost.mock.calls[0][0].createdAt).getTime();

  expect(createdAt).toBeGreaterThan(preDate)
  expect(createdAt).toBeLessThan(postDate)

  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {}))
})

test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({ data: { error: testError } })
  const { submitButton } = renderEditor()

  userEvent.click(submitButton)
  const postError = await screen.findByRole('alert')

  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})

// disabling this rule for now. We'll get to this later
/*
eslint
  testing-library/prefer-explicit-assert: "off",
*/
