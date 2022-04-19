import { useDispatch } from "react-redux";
import { orderBy } from "../../store/actions";

export function OrderSelector() {
    let dispatch = useDispatch();

    function selected(e) {
        console.log(e.target.value);
        dispatch(orderBy(e.target.value))
    }

    return <select name="order" id="order" onChange={selected}>
        <option defaultValue="Probando" >Select an Option</option>  
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Punct.(+)">Punct.(+)</option>
            <option value="Punct. (-)">Punct. (-)</option>
        </select>
    
};