import axios from 'axios';

export const AUMENTAR_CONTADOR = 'AUMENTAR_CONTADOR';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';

export function aumentarContador(){
    return {
        type: AUMENTAR_CONTADOR
    };
};

export function searchRecipes(recipe){
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/recipe?name=${recipe}`)
        .then(r => {
            dispatch({
                type: SEARCH_RECIPES,
                payload: r.data
            })
        })
    }
}