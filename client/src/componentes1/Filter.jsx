import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearFilters } from "../store1/actions";
import DietFilter from "./DietFilter";
import Order from "./Order";

export default function Filter() {

    const [orderBy, setOrderBy] = useState('');     // estado que contiene el valor de la opción del tipo de filtro seleccionada

    const dispatch = useDispatch();

    function radioBtn(e){
        console.log(e.target.value);
        if(e.target.value === 'a-z'){
            dispatch(clearFilters())
            setOrderBy('a-z');
        }
        if(e.target.value === 'diet'){
            dispatch(clearFilters())
            setOrderBy('diet');
        }
    }

    return <div>
        <p>Soy el filter</p>

        <input type="radio" value="a-z" name="order" id="a-z" onChange={radioBtn} />
        <label htmlFor="a-z">Alphabetic or punctuation</label>

        <input type="radio" value="diet" name="order" id="diet" onChange={radioBtn} />
        <label htmlFor="diet">Diet</label>
        {
            (orderBy === "a-z")? <Order /> : (orderBy === "diet")? <DietFilter /> : null
        }
        {
            (orderBy === "a-z")? <button onClick={() => dispatch(clearFilters())}>Sort alphabetically or punctuation</button> : (orderBy === "diet")? <button onClick={() => dispatch(clearFilters())}>Sort by diet</button> : null
        }
    </div>
}