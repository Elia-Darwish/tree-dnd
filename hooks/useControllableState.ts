import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useCallbackRef } from 'hooks/useCallbackRef'

type UseControllableStateParams<T> = {
  prop?: T | undefined
  defaultProp?: T | undefined
  onChange?: (state: T) => void
}

type SetStateFn<T> = (prevState?: T) => T

function isSetStateFn<T>(fn: SetStateAction<T>): fn is SetStateFn<T> {
  return typeof fn === 'function'
}

function useControllableState<T>({ prop, defaultProp, onChange }: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange })

  // providing a prop means the state is controlled
  const isControlled = prop !== undefined

  // If it's controlled, return the controlled prop
  const value = isControlled ? prop : uncontrolledProp
  const handleChange = useCallbackRef(onChange)

  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      // If it's controlled, call the onChange callback otherwise set the uncontrolled state
      if (isControlled) {
        const value = isSetStateFn(nextValue) ? nextValue(prop) : nextValue
        if (value !== prop) handleChange(value as T)
      } else {
        setUncontrolledProp(nextValue)
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange],
  )

  return [value, setValue] as const
}

function useUncontrolledState<T>({ defaultProp, onChange }: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrolledState = useState<T | undefined>(defaultProp)
  const [value] = uncontrolledState

  const prevValueRef = useRef(value)
  const handleChange = useCallbackRef(onChange)

  useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T)
      prevValueRef.current = value
    }
  }, [value, prevValueRef, handleChange])

  return uncontrolledState
}

export { useControllableState }
