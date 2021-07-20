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
                <Image src="/ramen.png" width={290} height={193} alt="homepageicon"></Image>
                <h1 className={styles.title}>Home</h1>
                <p className={styles.text}>Welcome to CookBook. Record your very own recipes and never forget them.</p>
            </div>
        </>
    )
}
