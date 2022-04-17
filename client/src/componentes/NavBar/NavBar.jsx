import { useState } from 'react';
import { useSelector } from 'react-redux';

export function NavBar() {
    let inputReceta = useSelector((state) => state.recipes);
    console.log(inputReceta);

    const [input, setInput] = useState({
        receta: ''
      })

    // const handleInputChange = function (e) {
    // setInput({
    //     ...input,
    //     [e.target.name]: e.target.value,
    // });


    return <div>
        Soy Henry - PI Foods
        <input type="text" name="inputRecetas" placeholder='Buscar receta/s...'/>
        <input type="submit" value="Buscar" />
    </div>
};