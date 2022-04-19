import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchAllRecipes, searchRecipes } from '../../store/actions';
import { OrderSelector } from '../OrderSelector/OrderSelector';

export function Input() {
    // let inputReceta = useSelector((state) => state.recipes);
    // console.log('Estoy joya en el input.', inputReceta);
    
    let dispatch = useDispatch();

    const [input, setInput] = useState('');

    function handleOnClick(){
        if(input.length) {
            //si no hay nada escrito en input alerta al usuario y no hace nada más
            dispatch(searchRecipes(input));
            setInput('');
        } else {
            alert('¡Por favor ingresa un valor en el buscador antes de iniciar una búsqueda!')
        }
    };

    return <div>
        Soy el input!
        <div>
            <input type="text" name="Buscar receta/s..." value={input} onChange={e => setInput(e.target.value)} placeholder='Buscar receta/s...' />
            <OrderSelector />
            <button onClick={handleOnClick}>Buscar</button>
            <button onClick={() => dispatch(searchAllRecipes())}>Trae todo vieja</button>
        </div>
    </div>
}