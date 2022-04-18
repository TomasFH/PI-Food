import { AUMENTAR_CONTADOR, SEARCH_ALL_RECIPES, SEARCH_RECIPES, SEARCH_RECIPES_ERROR } from "../actions";

const initialState = {
    recipes: [],
    counter: 0  
}

export function reducer(state = initialState, action) {

    switch(action.type) {
        
        case AUMENTAR_CONTADOR:
            return {
                ...state,
                counter: state.counter + 1
            }

        case SEARCH_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }

        case SEARCH_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }

        case SEARCH_RECIPES_ERROR:
            return {
                ...state,
                recipes: action.payload
            }

        default:
            return state;
    }
}