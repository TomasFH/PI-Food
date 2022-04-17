// import { useSelector} from 'react-redux'
import { connect } from 'react-redux'
import { aumentarContador, searchRecipes } from '../../store/actions';

export function Recipes({recipe, aumentar, searchRecipe}) {
    // let recipe = useSelector((state) => state.recipes)
    console.log(recipe);
    return <div>
        Soy recipe: 
        <button onClick={() => searchRecipe('chicken')}>Dale Yisus</button>
        <div>
            A ver si aparece algo:
            {recipe.map(e => {
                return  <div key={e.id}>
                    <h1>{e.name[0].toUpperCase() + e.name.slice(1)}</h1>
                    <img src={e.image} alt="img not found" />
                    <h5>
                        { (e.diets.length > 0)? e.diets.map(f => {
                        return f[0].toUpperCase() + f.slice(1)
                        }).join(', ') : 'No se ha encontrado dietas relacionadas.' 
                        /* todo este map hace que la primera letra
                         de cada elemento del arreglo de dietas se le ponga la primera
                         letra en mayúsculas y despues une el arreglo haciéndolo ser
                         una string */}
                    </h5>
                </div>
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
    searchRecipe: (recipe) => dispatch(searchRecipes(recipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);