import { useDispatch, useSelector } from "react-redux"
import { aumentar } from "../store1/actions"

export default function Contador() {

    let contar = useSelector((state) => state.contador)

    const dispatch = useDispatch()

    console.log('Soy contar: ', contar)


    return <div>
        <h3>Soy contador: {contar}</h3>
        <button onClick={() => dispatch(aumentar())}>Aumentar</button>
    </div>
}