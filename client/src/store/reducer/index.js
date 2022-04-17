import { AUMENTAR_CONTADOR, SEARCH_RECIPES } from "../actions";

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

        default:
            return state;
    }
}