import Link from 'next/link'

import { useDispatch } from 'react-redux'
import { sign_out } from '../../redux_toolkit/slices/loginSlice'
import { clear_recipes } from '../../redux_toolkit/slices/recipeSlice'

const loggedIn = () => {
    const dispatch = useDispatch()

    const onLogOut = () => {
        console.log('Logout Success!')
        dispatch(sign_out())
        dispatch(clear_recipes())
        sessionStorage.removeItem("jwt")
    }

    return (
        <>
            <Link href="/"><a>Home</a></Link>
            <Link href="/recipes"><a>Recipes</a></Link>
            <Link href="/"><a onClick={onLogOut}>Logout</a></Link>
        </>
    )
}

export default loggedIn
