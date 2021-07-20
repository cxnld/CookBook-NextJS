import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { getAllRecipes } from '../../utils/http-requests'

import RecipeGrid from '../../components/RecipeGrid'
import Spinner from 'react-bootstrap/Spinner'

const Recipes = () => {
    const router = useRouter()
    const [JWT, setJWT] = useState('')

    const { data, error } = getAllRecipes(JWT)

    useEffect(() => {
        if (sessionStorage.getItem("jwt") === null) {
            console.log('Not logged in, redirecting to homepage.')
            router.push('/')
        } else {
            setJWT(sessionStorage.getItem("jwt"))
        }
    }, [router])

    if (error) return <h2>Loading Failed</h2>
    if (!data) return <Spinner animation="border"/>
    if (data) {
        return (
            <>
                <Head>
                    <title>CookBook | Recipes</title>
                </Head>
                
                <RecipeGrid recipes={data}/>
            </>
        )
    }
}

export default Recipes