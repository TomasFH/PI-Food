import { ALL_DIETS, AUMENTAR, CLEAR_FILTERS, FILTER_BY_DIET, ORDER_BY, SEARCH_ALL_RECIPES, SEARCH_RECIPE } from "../actions";

const initialState = {
    contador: 0,
    allRecipes: [],         // Todas las recetas.
    searchedRecipe: [],     // Las recetas que coincidan con el buscador (input).
    orderedRecipe: [],      // Lista de recetas filtradas (que puede basarse en la info de allRecipes o searchedRecipe)
    dietList: [],           // Lista de dietas del back (API + DB)
    filterByDiet: [],       // Recetas filtradas por Dietas
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case AUMENTAR:
            return {
                ...state,
                contador: state.contador + 1
            }

        case SEARCH_ALL_RECIPES:
            return {
                ...state,
                allRecipes: action.payload
            }

        case SEARCH_RECIPE:
            return {
                ...state,
                searchedRecipe: action.payload
            }

        case ORDER_BY:
            
            let aux;

            if(state.searchedRecipe.length){
                // si el cliente filtra habiendo hecho ya una búsqueda en el buscador (y obtuvo resultado)
                aux = [...state.searchedRecipe]
            } else { // sino, se basa en todas las recetas
                aux = [...state.allRecipes]
            }
            // console.log('action: ', action.payload)
            switch(action.payload){

                case "A-Z":
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
                    console.log(aux);
                break;

                case "Z-A":
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
                    console.log(aux);
                    break;

                case "Punct. (+)":
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
                    console.log(aux);
                    break;
                    
                    case "Punct. (-)":
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
                    console.log(aux);
                    break;

                default:
                    aux = [];
                    return aux;
            }
            return {
                ...state,
                orderedRecipe: aux //check
            }

        case ALL_DIETS:
            return {
                ...state,
                dietList: action.payload
            }

        case FILTER_BY_DIET:
            console.log('Soy la dieta: ', action.payload);
            let aux1;

            if(state.searchedRecipe.length){
                // si el cliente filtra habiendo hecho ya una búsqueda en el buscador (y obtuvo resultado)
                aux1 = [...state.searchedRecipe]
            } else { // sino, se basa en todas las recetas
                aux1 = [...state.allRecipes]
            }

            let filtered = aux1.filter(r => {
                return r.diets.indexOf(action.payload) != -1
            })

            return {
                ...state,
                filterByDiet: filtered //debería tener un arreglo con la/s receta/s que tengan la dieta filtrada en su lista de dietas
            }

        case CLEAR_FILTERS:
            return {                  // reiniciar los filtros y ordenadores
                ...state,
                filterByDiet: [],
                orderedRecipe: []
            }
    
        default:
            return state;
    }
}