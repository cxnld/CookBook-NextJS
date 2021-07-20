import { createSlice } from '@reduxjs/toolkit'

export const recipeSlice = createSlice({
    name: 'recipes',

    initialState: [],

    reducers: {
        populate_recipes: (state, action) => {
            state.splice(0, state.length)
            state.push(...action.payload)
        },
        clear_recipes: (state) => {
            state.splice(0, state.length)
        }
    }
  
})

export const { populate_recipes, clear_recipes } = recipeSlice.actions

export default recipeSlice.reducer
