import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getRecipeByID } from '../../../utils/http-requests'

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const RecipeDetails = () => {
    const router = useRouter()
    const { id } = router.query
    const [JWT, setJWT] = useState('')

    const { data, error } = getRecipeByID(id, JWT)

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
                    <title>CookBook | {data.title}</title>
                </Head>
                <div className="recipeContent">
                    <img className="image" alt="recipe_image" src={data.image} />
                    <h1>{data.title}</h1>
                    <br/>
                    <h4>{data.description}</h4>
                    <br/>
                    <h3>Instructions</h3>
                    <br/>
                    {data.instructions.map((step, index) => (
                            <div key={index}>
                                <h6>Step {index+1}</h6>
                                <h5>{step}</h5>
                            </div>
                    ))}

                    <Link href={`/recipes/${id}/edit`} passHref>
                        <Button variant="secondary" style={{marginTop: '10px'}}>Edit</Button>
                    </Link>
                </div>
            </>
        )
    }
}

export default RecipeDetails
