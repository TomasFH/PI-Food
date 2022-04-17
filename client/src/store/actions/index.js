import axios from 'axios';

export const AUMENTAR_CONTADOR = 'AUMENTAR_CONTADOR';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const SEARCH_ALL_RECIPES = 'SEARCH_ALL_RECIPES';

export function aumentarContador(){
    return {
        type: AUMENTAR_CONTADOR
    };
};

export function searchRecipes(recipe){
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/recipe?name=${recipe}`) //trae el que se pida por Query
        .then(r => {
            dispatch({
                type: SEARCH_RECIPES,
                payload: r.data
            })
        })
    }
}

export function searchAllRecipes(){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/recipe`) //trae todo
        .then(r => {
            dispatch({
                type: SEARCH_ALL_RECIPES,
                payload: r.data
            })
        })
    }
}