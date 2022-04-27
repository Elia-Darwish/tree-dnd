import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'

import styles from './styles.module.css'

import { Draggable } from 'components/Draggable'
import type { Node } from 'types/api'
import { TreeLeaf } from 'components/TreeLeaf'
import { isNode } from 'types/api'
import { Toggle } from 'components/Toggle'
import { ChevronRight } from 'components/icons'

interface TreeNodeProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  /**
   * The Node data to be rendered.
   */
  data: Node
  /**
   * Pass the selected state to the child nodes.
   */
  parentSelected?: boolean
  /**
   * An Array of Indexes pointing to the current node
   */
  location: number[]
  /**
   * A boolean determining if the parent node is being dragged or not.
   */
  parentDragging?: boolean
}

function TreeNode({ data, parentSelected, location, parentDragging }: TreeNodeProps) {
  const [pressed, setPressed] = useState(false)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (typeof parentSelected !== 'boolean') return

    setPressed(parentSelected)
  }, [parentSelected])

  return (
    <li className={styles.container} aria-label={data.label}>
      <div className={styles.node} data-selected={pressed}>
        <Draggable
          data={data}
          location={location}
          dragging={dragging}
          onDraggingChanged={setDragging}
          disableDrop={parentDragging}
        >
          <Toggle
            pressed={pressed}
            onPressedChange={setPressed}
            aria-label={`select ${data.label}`}
            aria-selected={pressed}
          >
            <ChevronRight className={styles.node__icon} />
            <span>{data.label}</span>
          </Toggle>
        </Draggable>
      </div>

      <ul className={styles.children}>
        {data?.children.map((item, index) => {
          if (isNode(item)) {
            return (
              <TreeNode
                key={item.label}
                data={item}
                parentSelected={pressed}
                location={[...location, index]}
                parentDragging={dragging || parentDragging}
              />
            )
          } else {
            return (
              <TreeLeaf
                key={item.id}
                data={item}
                location={[...location, index]}
                parentDragging={dragging || parentDragging}
              />
            )
          }
        })}
      </ul>
    </li>
  )
}

export { TreeNode }
