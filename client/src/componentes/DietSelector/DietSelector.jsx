import { useDispatch, useSelector } from "react-redux"
import { searchAllDiets } from "../../store/actions";
import './DietSelector.css'

export function DietSelector(){
    const diets = useSelector(state => state.diets);
    const dispatch = useDispatch();
    
     return <div>
         {/* <input type="checkbox" /> */}
         <button onClick={() => dispatch(searchAllDiets())}>Probando</button>
         <button onClick={() => console.log('Soy el estado diets: ', diets)}>Chequear estado</button>
        <ul>
            {diets.map(e => {
                return <li key={e.id} >
                    <input type="checkbox" />
                    <label htmlFor={e.name}>{e.name[0].toUpperCase() + e.name.slice(1)}</label>
                </li>
            })}
        </ul>
     </div>
}