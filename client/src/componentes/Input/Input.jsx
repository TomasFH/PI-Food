import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { aumentarContador, searchAllRecipes, searchRecipes } from '../../store/actions';

export function Input() {
    let inputReceta = useSelector((state) => state.recipes);
    let dispatch = useDispatch();

    console.log('Estoy joya en el input.', inputReceta);

    const [input, setInput] = useState('');

    return <div>
        Soy el input!
        <div>
            <input type="text" name="Buscar receta/s..." placeholder='Buscar receta/s...' />
            <button onClick={() => dispatch(searchRecipes('chicken'))}>Buscar</button>
            <button onClick={() => dispatch(searchAllRecipes())}>Trae todo vieja</button>
        </div>
    </div>
}