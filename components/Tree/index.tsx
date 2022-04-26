import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useEffect } from 'react'

import styles from './styles.module.css'

import type { TreeData } from 'types/api'
import { isNode } from 'types/api'
import { useFetch } from 'hooks/useFetch'
import { TreeNode } from 'components/TreeNode'
import { TreeLeaf } from 'components/TreeLeaf'
import { Spinner } from 'components/icons'

function Tree() {
  const { data, fetch, isSuccess, isError, isLoading } = useFetch<TreeData>()

  useEffect(() => {
    fetch('https://ubique.img.ly/frontend-tha/data.json')
  }, [fetch])

  return (
    <section className={styles.container} aria-label="data tree">
      {(() => {
        switch (true) {
          case isError:
            return (
              <div className={styles.error}>
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
            return data?.map((item) => {
              if (isNode(item)) {
                return <TreeNode key={item.label} data={item} />
              } else {
                return <TreeLeaf key={item.id} data={item} />
              }
            })

          default:
            return null
        }
      })()}
    </section>
  )
}

export { Tree }
