import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getAllRecipes } from '../../utils/http-requests'

import RecipeGrid from '../../components/RecipeGrid'
import Button from 'react-bootstrap/Button'
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

                <div className="recipe-header">
                    <h1>My Recipes</h1>
                    <Link href="/recipes/new" passHref>
                        <Button variant="primary">New Recipe</Button>
                    </Link>
                </div>

                { data.length == 0 && <h5 className="norecipe">You have no recipes.</h5> }

                <RecipeGrid recipes={data}/>
            </>
        )
    }
}

export default Recipes