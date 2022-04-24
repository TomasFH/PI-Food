import { useState } from "react";
import { useDispatch } from 'react-redux'
import { orderByFunc } from "../store1/actions";

export default function Order(){

    const dispatch = useDispatch();

    function selected(e){
        // if(e.target.value === "Select an option"){
        //     console.log('Selected: ', e.target.value)
        //     setOrderBy(e.target.value)
        // } else {
        //     console.log('Selected: ', e.target.value)
        //     setOrderBy(e.target.value)
        // }

        // setOrderBy(e.target.value)
        // console.log(e.target.value)

        dispatch(orderByFunc(e.target.value))
        
    }

    return <div>
            <form action="order">
                <select name="order" id="order" onChange={selected} defaultValue="Select an option">
                    <option value="Select an option" disabled>Select an option</option>
                    <option value="A-Z" >A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="Punct. (+)">Punct. (+)</option>
                    <option value="Punct. (-)">Punct. (-)</option>
                </select>
            </form>
        </div>
}