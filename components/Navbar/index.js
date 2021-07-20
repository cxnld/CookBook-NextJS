import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useSelector, useDispatch } from 'react-redux'

import { sign_out } from '../../redux_toolkit/slices/loginSlice'
import { clear_recipes } from '../../redux_toolkit/slices/recipeSlice'


const Navbar = () => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState(false)
    const a = useSelector(state => state.login.status)

    useEffect(() => {
        if (sessionStorage.getItem("jwt") === null) {
            setStatus(false)
        } else {
            setStatus(true)
        }
    }, [status, a])

    const loggedIn = () => {
        const onLogOut = () => {
            console.log('Logout Success!')
            sessionStorage.removeItem("jwt")
            setStatus(false)
            dispatch(sign_out())
            dispatch(clear_recipes())
        }
    
        return (
            <>
                <Link href="/"><a>Home</a></Link>
                <Link href="/recipes"><a>Recipes</a></Link>
                <Link href="/"><a onClick={onLogOut}>Logout</a></Link>
            </>
        )
    }

    const loggedOut = () => {
        return (
            <>
                <Link href="/login"><a>Login</a></Link>
                <Link href="/register"><a>Register</a></Link>
            </>
        )
    }

    return (
        <nav>
            <Link href="/">
                <div className="logo">
                    <Image src="/favicon.ico" width={40} height={40} />
                    <h1>CookBook</h1>
                </div>
            </Link>
            { status ? loggedIn() : loggedOut() }
        </nav>
    )
}

export default Navbar