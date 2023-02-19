import * as React from 'react'
import {screen, render, within} from '@testing-library/react'
import {Modal} from '../modal'

test('modal shows the children', () => {
  render(
    <>
      <Modal>
        <div data-testid="test" />
      </Modal>
    </>,
    { baseElement: document.getElementById('modal-root') }
  )

  expect(screen.getByTestId('test')).toBeInTheDocument()
})
