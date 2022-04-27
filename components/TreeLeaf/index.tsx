import styles from './styles.module.css'

import type { Leaf } from 'types/api'
import { ChevronDoubleRight } from 'components/icons'
import { Draggable } from 'components/Draggable'

interface TreeLeafProps {
  /**
   * The Leaf data to be rendered.
   */
  data: Leaf
  /**
   * An Array of Indexes pointing to the current node
   */
  location: number[]
  /**
   * A boolean determining if the parent node is being dragged or not.
   */
  parentDragging?: boolean
}

function TreeLeaf({ data, location, parentDragging }: TreeLeafProps) {
  return (
    <li className={styles.container} aria-label={data.label}>
      <div className={styles.node}>
        <Draggable data={data} location={location} disableDrop={parentDragging}>
          <a href={`#${data.id}`} draggable="false">
            <ChevronDoubleRight className={styles.node__icon} />
            <span>{data.label}</span>
          </a>
        </Draggable>
      </div>
    </li>
  )
}

export { TreeLeaf }
