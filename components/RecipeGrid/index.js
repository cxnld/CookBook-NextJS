import GridElement from './GridElement'

const RecipeGrid = ({ recipes }) => {
    return (
        <div className="grid">
            {recipes.map(recipe => (
                <GridElement key={recipe._id} recipe={recipe}></GridElement>
            ))}
        </div>
    )
}

export default RecipeGrid
