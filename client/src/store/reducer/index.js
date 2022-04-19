import { ASCENDANT, AtoZ, DESCENDANT, ZtoA } from "../../Aux-Const/aux-const";
import { AUMENTAR_CONTADOR, ORDER, SEARCH_ALL_RECIPES, SEARCH_RECIPES, SEARCH_RECIPES_ERROR } from "../actions";

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

        case ORDER:
            let aux = [...state.recipes];

            switch(action.payload){

                case AtoZ:
                    console.log('Me ejecuté: ', action.payload);
                    aux = aux.sort((a,b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1
                        }
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }

                        return 0;
                        /* si el nombre es 'menor' (en terminos alfabéticos (?) ) devuelve -1;
                        si es mayor, 1; y, si es igual, 0. En vase a esos valores acomoda
                        izq o derecha en el arreglo*/
                    })

                break;

                case ZtoA:
                    console.log('Me ejecuté: ', action.payload);
                    aux = aux.sort((a,b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1
                        }
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1
                        }

                        return 0;
                        /* si el nombre es 'menor' (en terminos alfabéticos (?) ) devuelve -1;
                        si es mayor, 1; y, si es igual, 0. En vase a esos valores acomoda
                        izq o derecha en el arreglo*/
                    })
                    break;

                case ASCENDANT:
                    console.log('Me ejecuté: ', action.payload);
                    aux = aux.sort((a,b) => {
                        if(a.punctuation < b.punctuation) {
                            return 1
                        }
                        if(a.punctuation > b.punctuation) {
                            return -1
                        }

                        return 0;
                        /* si el nombre es 'menor' (en terminos alfabéticos (?) ) devuelve -1;
                        si es mayor, 1; y, si es igual, 0. En vase a esos valores acomoda
                        izq o derecha en el arreglo*/
                    })
                    break;

                case DESCENDANT:
                    console.log('Me ejecuté: ', action.payload);
                    aux = aux.sort((a,b) => {
                        if(a.punctuation < b.punctuation) {
                            return -1
                        }
                        if(a.punctuation > b.punctuation) {
                            return 1
                        }

                        return 0;
                        /* si el nombre es 'menor' (en terminos alfabéticos (?) ) devuelve -1;
                        si es mayor, 1; y, si es igual, 0. En vase a esos valores acomoda
                        izq o derecha en el arreglo*/
                    })
                    break;

                default:
                    break;
            }

            return {
                ...state,
                recipes: aux
            }
            
        default:
            return state;
    }
}