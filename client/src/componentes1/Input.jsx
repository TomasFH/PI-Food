import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { searchRecipe } from '../store1/actions';


// Componente que muestra el input y el botón para realizar una búsqueda.

export default function Input() {
    
    const [input, setInput] = useState('');         // estado que contiene el valor del input actualizado
    // const [orderBy, setOrderBy] = useState('');     // estado que contiene el valor de la opción del tipo de filtro seleccionada
    const dispatch = useDispatch();

    function onChangeHandler(e){
        setInput(e.target.value)
    }

    function onSubmitHandler(e){
        e.preventDefault();
        input? dispatch(searchRecipe(input)) : alert('Please enter a recipe to search for it');
        setInput('')
    }

    return <div>
       <div>
            <form action="searchRecipe">
            <input type="text" name="searchRecipe" value={input} id="searchRecipe" placeholder="Search recipes.." onChange={onChangeHandler} />
            <button type="submit" onClick={onSubmitHandler}>Search</button>
            </form>
       </div>
    </div>
}