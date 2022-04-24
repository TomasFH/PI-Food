import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByDiet } from "../store1/actions";

export default function DietFilter(){

    let dietList = useSelector(state => state.dietList)   //lista de dietas
    
    const dispatch = useDispatch();

    // console.log('Soy dietList: ', dietList)

    function selected(e){
        console.log(e.target.value);
        dispatch(filterByDiet(e.target.value))
    }

    return <div>
        <form action="filterByDiet">
                <select name="order" id="order" defaultValue="Select an option" onChange={selected}>
                <option value="Select an option" disabled>Select an option</option>
                    {
                        dietList.map(e => {
                            return <option value={e.name} key={e.id}>{
                                e.name[0].toUpperCase() + e.name.slice(1)
                            }</option>
                        })
                    }
                </select>
            </form>
    </div>
}