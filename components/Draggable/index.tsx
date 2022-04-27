import { createContext, PropsWithChildren, useContext, useState } from 'react'

import styles from './styles.module.css'

import { isNode, Leaf, Node } from 'types/api'
import { useControllableState } from 'hooks/useControllableState'

export type OnDrag = (data: Node | Leaf, location: number[]) => void
export type OnDrop = (data: Node | Leaf, location: number[], dropLocation: DropLocation | null) => void

interface DropLocation {
  location: number[]
  where: 'before' | 'after'
}

interface DragContextState {
  dropLocation: DropLocation | null
  setDropLocation: (dropLocation: DropLocation | null) => void
  onDrag?: OnDrag
  onDrop?: OnDrop
}

const DragContext = createContext<DragContextState | null>(null)

function useDraggable() {
  const context = useContext(DragContext)

  if (!context) {
    throw new Error('useDraggable must be used within a DraggableProvider')
  }

  return context
}

interface DraggableProviderProps {
  onDrag?: OnDrag
  onDrop?: OnDrop
}

function DraggableProvider({ children, onDrag, onDrop }: PropsWithChildren<DraggableProviderProps>) {
  const [dropLocation, setDropLocation] = useState<DropLocation | null>(null)

  return (
    <DragContext.Provider
      value={{
        dropLocation,
        setDropLocation,
        onDrag,
        onDrop,
      }}
    >
      {children}
    </DragContext.Provider>
  )
}

interface DraggableProps {
  data: Node | Leaf
  location: number[]
  disableDrop?: boolean
  dragging?: boolean
  onDraggingChanged?: (dragging: boolean) => void
}

function Draggable({
  children,
  data,
  location,
  disableDrop = false,
  dragging: draggingProp,
  onDraggingChanged,
}: PropsWithChildren<DraggableProps>) {
  const [where, setWhere] = useState<'before' | 'after' | 'none'>('none')
  const [dragging, setDragging] = useControllableState({
    prop: draggingProp,
    defaultProp: false,
    onChange: onDraggingChanged,
  })

  const { onDrop, onDrag, dropLocation, setDropLocation } = useDraggable()

  /* avoid dropping:
   ** - if the item is being dragged over itself
   ** - if the item is being dropped on a disabled drop location
   **/
  const isDisabled = dragging || disableDrop

  return (
    <div
      className={styles.draggable}
      data-dragging={dragging}
      onDragStart={() => {
        setDragging(true)
        onDrag?.(data, location)
      }}
      onDragEnd={(event) => {
        event.stopPropagation()
        setDragging(false)
        onDrop?.(data, location, dropLocation)
      }}
      onDragOver={(event) => {
        if (dragging || isDisabled) {
          setDropLocation(null)
          return
        }

        const { clientY } = event
        const rect = event.currentTarget.getBoundingClientRect()

        const y = clientY - rect.top

        setDropLocation({
          location,
          where: y < rect.height / 2 ? 'before' : 'after',
        })
        setWhere(y < rect.height / 2 ? 'before' : 'after')
      }}
      onDragLeave={() => {
        setWhere('none')
      }}
      data-where={where}
      data-disabled={isDisabled}
      draggable
    >
      {children}
    </div>
  )
}

export { Draggable, DraggableProvider, useDraggable }
