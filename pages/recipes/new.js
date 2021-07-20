import styles from '../../styles/NewRecipe.module.css'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { createRecipe } from '../../utils/http-requests'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const NewRecipe = () => {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [instructions, setInstructions] = useState(['']);
    const [image, setImage] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem("jwt") === null) {
            console.log('Not logged in, redirecting to homepage.')
            router.push('/')
        }
    }, [router])

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
            title: title,
            description: description,
            instructions: instructions,
            image: image
        }
        console.log(data)
        createRecipe(data, sessionStorage.getItem("jwt"))
        .then(() => {
            router.push('/recipes')
        })
        .catch(err => console.log(err))

    }

    return (
        <>
            <Head>
                <title>CookBook | New Recipe</title>
            </Head>

            <div className={styles.newRecipeContainer}>
                <h1>New Recipe</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Recipe Name</Form.Label>
                        <Form.Control type='text' placeholder='Recipe Name' onChange={e => setTitle(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' placeholder='Description' onChange={e => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Label>Instructions</Form.Label>
                    {instructions.map((instruction, index) => (
                        <div key={index}>
                            <Form.Label>Step {index+1}</Form.Label>
                            <div className={styles.instructionBlock}>
                                <Form.Group className={styles.instructionTextArea} controlId="formDescription">
                                    <Form.Control as="textarea" rows={2} onChange={event => handleInputChange(index, event)}/>
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
                        <Form.Control type='text' placeholder='Image Link' onChange={e => setImage(e.target.value)}></Form.Control>
                    </Form.Group>

                    <div className={styles.rightAlign}>
                        <Link href="/recipes" passHref><Button variant="light" >Cancel</Button></Link>
                        <Button variant="primary" type="submit" style={{marginLeft: '10px'}}>Create</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default NewRecipe
