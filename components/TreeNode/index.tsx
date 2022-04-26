import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'

import styles from './styles.module.css'

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
}

function TreeNode({ data, parentSelected }: TreeNodeProps) {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (typeof parentSelected !== 'boolean') return

    setPressed(parentSelected)
  }, [parentSelected])

  return (
    <li className={styles.container} aria-label={data.label}>
      <Toggle
        className={styles.node}
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label={`select ${data.label}`}
        aria-selected={pressed}
        data-selected={pressed}
      >
        <ChevronRight className={styles.node__icon} />
        <span>{data.label}</span>
      </Toggle>

      <ul className={styles.children}>
        {data?.children.map((item) => {
          if (isNode(item)) {
            return <TreeNode key={item.label} data={item} parentSelected={pressed} />
          } else {
            return <TreeLeaf key={item.id} data={item} />
          }
        })}
      </ul>
    </li>
  )
}

export { TreeNode }
