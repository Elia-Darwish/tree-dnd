import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import styles from './styles.module.css'

import { useFetch } from 'hooks/useFetch'
import { LeafInfo } from 'types/api'
import { Spinner } from 'components/icons'

function LeafDetails() {
  const [id, setId] = useState('')
  const { data, error, fetch, isLoading, isError, isSuccess, isIdle } = useFetch<LeafInfo>()

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        setId(hash)
      }
    }

    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    if (!id) return

    fetch(`https://ubique.img.ly/frontend-tha/entries/${id}.json`)
  }, [id, fetch])

  return (
    <section className={styles.container} aria-live="polite" aria-busy={isLoading} aria-label="leaf details">
      {(() => {
        switch (true) {
          case isIdle:
            return (
              <div className={styles.card}>
                <p>Select and Item from the data tree to show details</p>
              </div>
            )

          case isError:
            return (
              <div className={styles.card} role="alert">
                <p>There was an error while fetching the data</p>
                <button
                  onClick={() => {
                    if (!id) return
                    fetch(`https://ubique.img.ly/frontend-tha/entries/${id}.json`)
                  }}
                >
                  retry
                </button>
              </div>
            )

          case isLoading:
            return <Spinner width={48} height={48} />

          case isSuccess:
            return data ? (
              <article className={styles.card} aria-label={`${id} details`}>
                <p>
                  <strong>Created At:</strong> {format(new Date(data.createdAt), 'dd.MM.yyyy')}
                </p>
                <p>
                  <strong>Created By:</strong> {data.createdBy}
                </p>
                <p>
                  <strong>Last modified at:</strong> {format(new Date(data.lastModifiedAt), 'dd.MM.yyyy')}
                </p>
                <p>
                  <strong>last modified By:</strong> {data.lastModifiedBy}
                </p>
                <p>{data.description}</p>
              </article>
            ) : null

          default:
            return null
        }
      })()}
    </section>
  )
}

export { LeafDetails }
