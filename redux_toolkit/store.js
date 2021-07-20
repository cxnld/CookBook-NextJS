import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/loginSlice'
import recipeSlice from './slices/recipeSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    recipes: recipeSlice,
  }
})