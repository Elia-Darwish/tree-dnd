import styles from './styles.module.css'

import type { Leaf } from 'types/api'
import { ChevronDoubleRight } from 'components/icons'

interface TreeLeafProps {
  /**
   * The Leaf data to be rendered.
   */
  data: Leaf
}

function TreeLeaf({ data }: TreeLeafProps) {
  return (
    <article className={styles.container}>
      <a href={`#${data.id}`} className={styles.node}>
        <ChevronDoubleRight className={styles.node__icon} />
        <span>{data.label}</span>
      </a>
    </article>
  )
}

export { TreeLeaf }
