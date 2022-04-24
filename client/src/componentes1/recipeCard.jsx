import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allDiets, searchAllRecipes } from "../store1/actions";
import Filter from "./Filter";

//Componente que muestra todas las dietas de la App

export default function RecipeCards(){

    let allRecipes = useSelector(state => state.allRecipes);            //todas las recetas
    let searchedRecipe = useSelector(state => state.searchedRecipe);    //receta buscada en el input
    let orderedRecipe = useSelector(state => state.orderedRecipe);      //recetas ordenadas (las recetas dependen de si se hizo una búsqueda o no)
    let filterByDiet = useSelector(state => state.filterByDiet);        //recetas filtradas por dieta

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchAllRecipes());   // al iniciar la página, trae todas las recetas del Back
        dispatch(allDiets());           // al iniciar la página, trae todas las dietas del Back
    }, [])

    if(searchedRecipe.length){ //si se buscó una receta desde el input

        if(orderedRecipe.length){
            //si hay algo en el arreglo ordenado...
            return <div>
                <Filter />
                {
                orderedRecipe.map(e => {
                    return <div key={e.id}>
    
                        <h2>{e.name}</h2>
    
                        <img src={e.image} alt="img not found" />
    
                        <h4>{e.diets.map(f => {
                            return (e.diets.indexOf(f) === e.diets.length - 1)? f[0].toUpperCase() + f.slice(1) + '.' :  f[0].toUpperCase() + f.slice(1) + ', '
                            })} 
                        {/*Todo este choclo de arriba sirve para que de la lista de Dietas (que es un Array), por cada elemento, me devuelva esa dieta y una coma (",") al final, pero si es el último elemento devuelve un punto final (".") */}
                        </h4>
                        
                    </div>
                })
            }
            </div>
        } else if (filterByDiet.length){
            //si hay algo en el arreglo filtrado por dieta...
            return <div>
                <Filter />
            {
            filterByDiet.map(e => {
                return <div key={e.id}>

                    <h2>{e.name}</h2>

                    <img src={e.image} alt="img not found" />

                    <h4>{e.diets.map(f => {
                        return (e.diets.indexOf(f) === e.diets.length - 1)? f[0].toUpperCase() + f.slice(1) + '.' :  f[0].toUpperCase() + f.slice(1) + ', '
                        })} 
                    {/*Todo este choclo de arriba sirve para que de la lista de Dietas (que es un Array), por cada elemento, me devuelva esa dieta y una coma (",") al final, pero si es el último elemento devuelve un punto final (".") */}
                    </h4>
                    
                </div>
            })
        }
        </div>
        } else {
            return <div>
            <Filter />
        {
            searchedRecipe.map(e => {
                return <div key={e.id}>

                    <h2>{e.name}</h2>

                    <img src={e.image} alt="img not found" />

                    <h4>{e.diets.map(f => {
                        return (e.diets.indexOf(f) === e.diets.length - 1)? f[0].toUpperCase() + f.slice(1) + '.' :  f[0].toUpperCase() + f.slice(1) + ', '
                        })} 
                    {/*Todo este choclo de arriba sirve para que de la lista de Dietas (que es un Array), por cada elemento, me devuelva esa dieta y una coma (",") al final, pero si es el último elemento devuelve un punto final (".") */}
                    </h4>
                    
                </div>
            })
        }
    </div>
        }
    } else{                     // todas las recetas. Por defecto este else se ejecuta al iniciar la página.
        if(orderedRecipe.length){
            //si hay algo en el arreglo ordenado...
            return <div>
                <Filter />
                {
                orderedRecipe.map(e => {
                    return <div key={e.id}>
    
                        <h2>{e.name}</h2>
    
                        <img src={e.image} alt="img not found" />
    
                        <h4>{e.diets.map(f => {
                            return (e.diets.indexOf(f) === e.diets.length - 1)? f[0].toUpperCase() + f.slice(1) + '.' :  f[0].toUpperCase() + f.slice(1) + ', '
                            })} 
                        {/*Todo este choclo de arriba sirve para que de la lista de Dietas (que es un Array), por cada elemento, me devuelva esa dieta y una coma (",") al final, pero si es el último elemento devuelve un punto final (".") */}
                        </h4>
                        
                    </div>
                })
            }
            </div>
        } else if (filterByDiet.length){
                //si hay algo en el arreglo filtrado por dieta...
                return <div>
                    <Filter />
                {
                filterByDiet.map(e => {
                    return <div key={e.id}>

                        <h2>{e.name}</h2>

                        <img src={e.image} alt="img not found" />

                        <h4>{e.diets.map(f => {
                            return (e.diets.indexOf(f) === e.diets.length - 1)? f[0].toUpperCase() + f.slice(1) + '.' :  f[0].toUpperCase() + f.slice(1) + ', '
                            })} 
                        {/*Todo este choclo de arriba sirve para que de la lista de Dietas (que es un Array), por cada elemento, me devuelva esa dieta y una coma (",") al final, pero si es el último elemento devuelve un punto final (".") */}
                        </h4>
                        
                    </div>
                })
            }
            </div>
            } else {
                return <div>
                <Filter />
            {
                allRecipes.map(e => {
                    return <div key={e.id}>

                        <h2>{e.name}</h2>

                        <img src={e.image} alt="img not found" />

                        <h4>{e.diets.map(f => {
                            return (e.diets.indexOf(f) === e.diets.length - 1)? f[0].toUpperCase() + f.slice(1) + '.' :  f[0].toUpperCase() + f.slice(1) + ', '
                            })} 
                        {/*Todo este choclo de arriba sirve para que de la lista de Dietas (que es un Array), por cada elemento, me devuelva esa dieta y una coma (",") al final, pero si es el último elemento devuelve un punto final (".") */}
                        </h4>
                        
                    </div>
                })
            }
        </div>
        }
    }
}