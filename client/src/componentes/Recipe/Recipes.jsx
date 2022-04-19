// import { useSelector} from 'react-redux'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { aumentarContador, searchAllRecipes, searchRecipes } from '../../store/actions';

export function Recipes({recipe, aumentar, searchRecipe, searchAllRecipes}) {
    // let recipe = useSelector((state) => state.recipes)
    console.log(recipe);

    // useEffect(() => {
    //     searchAllRecipes()           // Habilitar estas líneas de código para que al 
    // }, [])                           // montarse el componente se muestren todas las recetas automáticamente.

    return <div>
        <div>
            Recetas:
            {recipe.map(e => {
                if(e.name){
                    return  <div key={e.id}>
                    <h1>{e.name[0].toUpperCase() + e.name.slice(1)}</h1>
                    <img src={e.image} alt="img not found" />
                    <h5>
                        { (e.diets.length > 0)? e.diets.map(f => {
                        return f[0].toUpperCase() + f.slice(1)
                        }).join(', ') : 'No se ha encontrado dietas relacionadas.' 
                        /* todo este map hace que a cada elemento del arreglo de dietas
                         se le ponga la primera letra en mayúsculas y después transforma el
                         arreglo en una string */}
                    </h5>
                </div>
                } else if(e.error) {
                    return <div key='error'>
                        {e.error}
                    </div>
                };
            })}
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    recipe: state.recipes,
    contador: state.counter
})

const mapDispatchToProps = (dispatch) => ({
    aumentar: () => dispatch(aumentarContador()),
    searchRecipe: (recipe) => dispatch(searchRecipes(recipe)),
    searchAllRecipes: () => dispatch(searchAllRecipes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);