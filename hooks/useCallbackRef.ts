import { useRef, useEffect, useMemo } from 'react'

/**
 * convert a callback to a ref to:
 * 1- avoid triggering re-renders when passed as a prop
 * 2- avoid re-executing effects when passed as a dependency
 */
function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, [])
}

export { useCallbackRef }
