import useSWR from 'swr'
import axios from "axios";
import { port } from './endpoint'

// LOGIN
const login = (loginInfo) => {
    return axios.post(`${port}/auth/login`, loginInfo)
}

// REGISTER
const register = (registerInfo) => {
    return axios.post(`${port}/auth/register`, registerInfo)
}

// GET USER DATA
const getUserData = (jwt) => {
    return useSWR([`${port}/user`, jwt], (url, token) => axios.get(url, {
        headers: {  
            'auth-token': token
        }})
        .then(res => res.data)
        .catch(err => console.log(err)))
}

// GET ALL RECIPES
const getAllRecipes = (token) => {
    return useSWR([`${port}/recipes`, token], (url, token) => axios.get(url, {
        headers: {  
            'auth-token': token
        }})
        .then(res => res.data)
        .catch(err => console.log(err)))
}

// GET RECIPE BY ID
const getRecipeByID = (id, token) => {
    return useSWR([`${port}/recipes/${id}`, token], (url, token) => axios.get(url, {
        headers: {  
            'auth-token': token
        }})
        .then(res => res.data)
        .catch(err => console.log(err)))
}

// CREATE RECIPE
const createRecipe = (recipeData, token) => {
    return axios.post(`${port}/recipes/new`, recipeData, {
        headers: {
            'auth-token': token
        }})
}

// UPDATE A RECIPE
const updateRecipe = (recipeData, token) => {
    return axios.patch(`${port}/recipes/update`, recipeData, {
        headers: {
            'auth-token': token
        }})
}

// DELETE A RECIPE
const deleteRecipe = (recipeID, token) => {
    return axios.delete(`${port}/recipes`, {
        headers: {
            'auth-token': token
        },
        data: {
            _id: recipeID
        }})
}

export { login, register, getUserData, getAllRecipes, getRecipeByID, createRecipe, updateRecipe, deleteRecipe }