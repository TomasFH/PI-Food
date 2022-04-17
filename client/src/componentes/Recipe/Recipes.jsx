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
                    <h1>{e.title}</h1>
                    <img src={e.image} alt="img not found" />
                    <h5>{e.image}</h5>
                </div>
            })}
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    recipe: state.recipes,
})

const mapDispatchToProps = (dispatch) => ({
    aumentar: () => dispatch(aumentarContador()),
    searchRecipe: (recipe) => dispatch(searchRecipes(recipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);