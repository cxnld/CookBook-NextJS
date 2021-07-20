import styles from '../../../styles/NewRecipe.module.css'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { getRecipeByID, updateRecipe, deleteRecipe } from '../../../utils/http-requests'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

const EditRecipe = () => {
    const router = useRouter()
    const { id } = router.query

    const [JWT, setJWT] = useState('')
    const { data, error } = getRecipeByID(id, JWT)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [instructions, setInstructions] = useState([''])
    const [image, setImage] = useState('')
    
    const handleInputChange = (index, event) => {
        const values = [...instructions];
        values[index] = event.target.value
        setInstructions(values);
    }

    const values = [...instructions];
    const handleAddFields = () => {
        values.push('');
        setInstructions(values)
    }

    const handleRemoveFields = index => {
        const values = [...instructions];
        values.splice(index, 1);
        setInstructions(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            _id: id,
            title: title,
            description: description,
            instructions: instructions,
            image: image
        }
        console.log(data)
        
        updateRecipe(data, JWT)
        .then(() => {
            router.push(`/recipes/${id}`)
        })
        .catch(err => console.log(err))
        
    }

    const handleDelete = () => {
        deleteRecipe(id, JWT)
        .then(() => {
            router.push(`/recipes`)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if (sessionStorage.getItem("jwt") === null) {
            console.log('Not logged in, redirecting to homepage.')
            router.push('/')
        } else {
            setJWT(sessionStorage.getItem("jwt"))
            // when we receive the recipe information, populate the form
            if (data) {
                setTitle(data.title)
                setDescription(data.description)
                setInstructions(data.instructions)
                setImage(data.image)
            }
        }
    }, [router, data])

    if (error) return <h2>Loading Failed</h2>
    if (!data) return <Spinner animation="border"/>
    if (data) {
        return (
            <>
                <Head>
                    <title>CookBook | Edit Recipe</title>
                </Head>

                <div className={styles.newRecipeContainer}>
                    <div className={styles.editHeader}>
                        <h1>Edit Recipe</h1>
                        <Button variant="danger" onClick={() => handleDelete()}>Delete Recipe</Button>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Label>Instructions</Form.Label>
                        {instructions.map((instruction, index) => (
                            <div key={index}>
                                <Form.Label>Step {index+1}</Form.Label>
                                <div className={styles.instructionBlock}>
                                    <Form.Group className={styles.instructionTextArea} controlId="formDescription">
                                        <Form.Control as="textarea" value={instructions[index]} rows={3} onChange={event => handleInputChange(index, event)}/>
                                    </Form.Group>
                                    <Button variant="primary" type="button" onClick={() => handleRemoveFields(index)}>X</Button>
                                </div>
                            </div>
                        ))}

                        <div className={styles.rightAlign}>
                            <Button variant="primary" onClick={() => handleAddFields()}>Add Step</Button>
                        </div>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Image Link</Form.Label>
                            <Form.Control type='text' value={image} onChange={e => setImage(e.target.value)}></Form.Control>
                        </Form.Group>

                        <div className={styles.rightAlign}>
                            <Link href="/recipes" passHref><Button variant="light" >Cancel</Button></Link>
                            <Button variant="primary" type="submit" style={{marginLeft: '10px'}}>Update</Button>
                        </div>
                    </Form>
                </div>
            </>
        )
    }
}

export default EditRecipe
