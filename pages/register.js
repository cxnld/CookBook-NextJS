import styles from '../styles/Auth.module.css'

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { register } from '../utils/http-requests'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const Register = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [badEmail, setBadEmail] = useState(false)
    const [matchingPassword, setMatchingPassword] = useState(true)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (password !== password2) {
            setMatchingPassword(false)
        }

        const registerData = {
            name: name,
            email: email,
            password: password
        }

        register(registerData)
        .then((res) => {
            console.log(res)
            router.push('/login')
        })  
        .catch(err => {
            console.log(err)
            setBadEmail(true)
        })
    }

    return (
        <>
            <Head>
                <title>CookBook | Register</title>
            </Head>

            <div className={styles.loginContainer}>
                <h1>Register</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Name' onChange={e => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control type='email' placeholder='example@gmail.com' onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    {badEmail && <Alert variant='danger'>Email already exists</Alert>}

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPassword2">
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type='password' placeholder='Re-enter Password' onChange={e => setPassword2(e.target.value)}></Form.Control>
                    </Form.Group>

                    {!matchingPassword && <Alert variant='danger'>Passwords do not match</Alert>}
                    
                    <Button variant="primary" type="submit" block>Register</Button>
                </Form>

                <Link href="/login">
                    <Button variant="link" block>Already have an account? Click to login.</Button>
                </Link>

            </div>
        </>
    )
}

export default Register
