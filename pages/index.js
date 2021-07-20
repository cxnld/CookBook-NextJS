import styles from '../styles/Home.module.css'

import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
    return (
        <>
            <Head>
                <title>CookBook | Home</title>
            </Head>
            <div className={styles.home}>
                <Image src="/ramen.png" width={290} height={193} ></Image>
                <h1 className={styles.title}>Homepage</h1>
                <p className={styles.text}>Welcome to your own cookbook where you can keep your own recipes.</p>
            </div>
        </>
    )
}
