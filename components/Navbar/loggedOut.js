import Link from 'next/link'

const loggedOut = () => {
    return (
        <>
            <Link href="/login"><a>Login</a></Link>
            <Link href="/register"><a>Register</a></Link>
        </>
    )
}

export default loggedOut
