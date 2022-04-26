import type { NextPage } from 'next'
import { Fragment } from 'react'
import Head from 'next/head'

import styles from 'styles/Home.module.css'
import { Tree } from 'components/Tree'
import { LeafDetails } from 'components/LeafDetails'

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Tree DND</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.layout}>
        <Tree />
        <LeafDetails />
      </main>
    </Fragment>
  )
}

export default Home
