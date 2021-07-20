import styles from '../styles/Auth.module.css'

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { login } from '../utils/http-requests'

import { useDispatch } from 'react-redux'
import { sign_in } from '../redux_toolkit/slices/loginSlice'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [badLogin, setBadLogin] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        const loginInfo = {
            email: email,
            password: password
        }
        
        login(loginInfo)
        .then((res) => {
            console.log("Login Success!")
            dispatch(sign_in(res.data))
            sessionStorage.setItem("jwt", res.data)
            router.push('/recipes')
        })
        .catch(err => {
            console.log(err)
            setBadLogin(true)
        })
    }

    return (
        <>
            <Head>
                <title>CookBook | Login</title>
            </Head>

            <div className={styles.loginContainer}>
                <h1>Login</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control type='email' placeholder='example@gmail.com' onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    { badLogin && <Alert variant='danger'>Email or password is incorrect</Alert> }
                    
                    <Button variant="primary" type="submit" block>Login</Button>
                </Form>

                <Link href="/register" passHref>
                    <Button variant="link" block>Don&apos;t have an account? Click to register.</Button>
                </Link>
            </div>
        </>
    )
}

export default Login
