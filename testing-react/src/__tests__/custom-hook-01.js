import * as React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
import {useCounter} from '../use-counter'

test('exposes the count and increment/decrement functions', () => {
  const { result: counter } = renderHook(useCounter)
  expect(counter.current.count).toBe(0)
  act(() => counter.current.increment())
  expect(counter.current.count).toBe(1)
  act(() => counter.current.decrement())
  expect(counter.current.count).toBe(0)
})

test('allows customization of the initial state', () => {
  const {result: counter} = renderHook(useCounter, { initialProps: { initialCount: 10 } })
  expect(counter.current.count).toBe(10)
})

test('allows customization of the step', () => {
  const {result: counter} = renderHook(useCounter, { initialProps: { step: 2 } })
  expect(counter.current.count).toBe(0)
  act(() => counter.current.increment())
  expect(counter.current.count).toBe(2)
  act(() => counter.current.decrement())
  expect(counter.current.count).toBe(0)
})
