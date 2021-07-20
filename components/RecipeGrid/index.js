import Link from 'next/link'

import GridElement from './GridElement'
import Button from 'react-bootstrap/Button'

const RecipeGrid = ({ recipes }) => {
    return (
        <div>
            <div className="recipe-header">
                <h1>My Recipes</h1>
                <Link href="/recipes/new" passHref>
                    <Button variant="primary">New Recipe</Button>
                </Link>
            </div>
            <div className="grid">
                {recipes.map(recipe => (
                    <GridElement key={recipe._id} recipe={recipe}></GridElement>
                ))}
            </div>
        </div>
    )
}

export default RecipeGrid
