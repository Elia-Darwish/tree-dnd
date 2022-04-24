import { useCallback, useEffect, useReducer, useRef } from 'react'

interface State<T> {
  status: 'loading' | 'success' | 'error' | 'idle'
  data?: T
  error?: Error
}

type Action<T> = { type: 'loading' } | { type: 'fetched'; payload: T } | { type: 'error'; payload: Error }

export function useFetch<T>() {
  // prevent state update if the component is unmounted
  const cancelRequest = useRef(false)
  const initialState: State<T> = { status: 'idle' }

  const fetchReducer = useCallback((state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { status: 'loading' }
      case 'fetched':
        return { status: 'success', data: action.payload }
      case 'error':
        return { status: 'error', error: action.payload }
      default:
        return state
    }
  }, [])

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const fetcher = useCallback(async (url: string, options?: RequestInit) => {
    if (!url) return

    dispatch({ type: 'loading' })

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = (await response.json()) as T

      // do nothing if the component is unmounted
      if (cancelRequest.current) return

      dispatch({ type: 'fetched', payload: data })

      return data
    } catch (error) {
      // do nothing if the component is unmounted
      if (cancelRequest.current) return

      dispatch({ type: 'error', payload: error as Error })
    }
  }, [])

  // Cancel the request if the component is unmounted
  useEffect(() => {
    cancelRequest.current = false
    return () => {
      cancelRequest.current = true
    }
  }, [])

  return {
    ...state,
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    fetch: fetcher,
  }
}
