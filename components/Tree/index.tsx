import { useState } from 'react'
import { useEffect } from 'react'

import styles from './styles.module.css'

import type { Leaf, Node, TreeData } from 'types/api'
import { isNode } from 'types/api'
import { useFetch } from 'hooks/useFetch'
import { TreeNode } from 'components/TreeNode'
import { TreeLeaf } from 'components/TreeLeaf'
import { Spinner } from 'components/icons'
import { DraggableProvider, OnDrop } from 'components/Draggable'

function Tree() {
  const { data, fetch, isSuccess, isError, isLoading } = useFetch<TreeData>()

  const [tree, setTree] = useState<TreeData>([])

  useEffect(() => {
    if (!data) return

    setTree(data)
  }, [data])

  useEffect(() => {
    fetch('https://ubique.img.ly/frontend-tha/data.json')
  }, [fetch])

  const handleDrop: OnDrop = (data, location, dropLocation) => {
    // Do nothing if we don't have a drop location
    if (!dropLocation) return

    let newTree = [...tree]
    let dragFrom = newTree
    let dropIn = newTree

    // if it's not a top level node, we need to find the parent node
    if (dropLocation.location.length > 1) {
      for (let i = 0; i < dropLocation.location.length - 1; i++) {
        const parent = dropIn[dropLocation.location[i]] as Node

        dropIn = parent.children
      }
    }

    // if it's not a top level node, we need to find the parent node
    if (location.length > 1) {
      for (let i = 0; i < location.length - 1; i++) {
        const parent = dragFrom[location[i]]

        if (isNode(parent)) {
          dragFrom = parent.children
        }
      }
    }

    // cut the item out of the old location
    dragFrom.splice(location[location.length - 1], 1)

    // insert the item into the new location
    if (dropLocation.where === 'before') {
      dropIn.splice(dropLocation.location[dropLocation.location.length - 1], 0, data)
    } else {
      dropIn.splice(dropLocation.location[dropLocation.location.length - 1] + 1, 0, data)
    }

    setTree(newTree)

    // eslint-disable-next-line no-console
    console.log(newTree)
  }

  return (
    <section className={styles.container} aria-label="data tree" aria-live="polite" aria-busy={isLoading}>
      {(() => {
        switch (true) {
          case isError:
            return (
              <div className={styles.error} role="alert">
                <span>There was an error loading the tree data</span>
                <button
                  onClick={() => {
                    fetch('https://ubique.img.ly/frontend-tha/data.json')
                  }}
                >
                  retry
                </button>
              </div>
            )

          case isLoading:
            return (
              <div className={styles.loading}>
                <Spinner />
              </div>
            )

          case isSuccess:
            return (
              <DraggableProvider onDrop={handleDrop}>
                <ul className={styles.list}>
                  {tree.map((item, index) => {
                    if (isNode(item)) {
                      return <TreeNode key={item.label} data={item} location={[index]} />
                    } else {
                      return <TreeLeaf key={item.id} data={item} location={[index]} />
                    }
                  })}
                </ul>
              </DraggableProvider>
            )

          default:
            return null
        }
      })()}
    </section>
  )
}

export { Tree }
