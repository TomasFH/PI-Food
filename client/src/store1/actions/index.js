import axios from 'axios';

export const AUMENTAR = 'AUMENTAR';
export const SEARCH_ALL_RECIPES = 'SEARCH_ALL_RECIPES'; // trae todas las recetas
export const SEARCH_RECIPE = 'SEARCH_RECIPE';           // trae la que nos pidan por el input
export const ORDER_BY = 'ORDER_BY';                     // ordena alfabéticamente o por puntos
export const ALL_DIETS = 'ALL_DIETS';                   // trae todas las dietas
export const FILTER_BY_DIET = 'FILTER_BY_DIET';         // filtra recetas que coincidan con el tipo de dieta buscado
export const CLEAR_FILTERS = 'CLEAR_FILTERS';           // limpia ambos tipos de filtros

export function aumentar() {
    return {
        type: AUMENTAR,
        payload: '+'
    }
}

//Trae todas las recetas
export function searchAllRecipes(){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/recipe`)
        .then(r => {
            dispatch({
                type: SEARCH_ALL_RECIPES,
                payload: r.data
            })
        })
    }
}

// Trae las recetas que coincidan con lo escrito en el input
export function searchRecipe(recipe){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/recipe?name=${recipe}`)
        .then(r => {
            dispatch({
                type: SEARCH_RECIPE,
                payload: r.data
            })
        })
    }
}

export function orderByFunc(order){
    return {
        type: ORDER_BY,
        payload: order
    }
}

export function allDiets(){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/recipe/types`)
        .then(r => {
            dispatch({
                type: ALL_DIETS,
                payload: r.data
            })
        })
    }
}

export function filterByDiet(diet){
    return {
        type: FILTER_BY_DIET,
        payload: diet
    }
}

export function clearFilters(){
    return {
        type: CLEAR_FILTERS,
    }
}