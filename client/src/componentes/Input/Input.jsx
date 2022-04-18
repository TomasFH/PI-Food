import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchAllRecipes, searchRecipes } from '../../store/actions';

export function Input() {
    // let inputReceta = useSelector((state) => state.recipes);
    // console.log('Estoy joya en el input.', inputReceta);
    
    let dispatch = useDispatch();

    const [input, setInput] = useState('');

    function handleOnClick(){
        dispatch(searchRecipes(input));
        setInput('');
    };

    return <div>
        Soy el input!
        <div>
            <input type="text" name="Buscar receta/s..." value={input} onChange={e => setInput(e.target.value)} placeholder='Buscar receta/s...' />
            <button onClick={handleOnClick}>Buscar</button>
            <button onClick={() => dispatch(searchAllRecipes())}>Trae todo vieja</button>
        </div>
    </div>
}