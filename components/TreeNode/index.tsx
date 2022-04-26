import { DetailedHTMLProps, HTMLAttributes, useState } from 'react'

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
}

function TreeNode({ data }: TreeNodeProps) {
  const [pressed, setPressed] = useState(false)

  return (
    <article className={styles.container}>
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

      <div className={styles.children}>
        {data?.children.map((item) => {
          if (isNode(item)) {
            return <TreeNode key={item.label} data={item} />
          } else {
            return <TreeLeaf key={item.id} data={item} />
          }
        })}
      </div>
    </article>
  )
}

export { TreeNode }
