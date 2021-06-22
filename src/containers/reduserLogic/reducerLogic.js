import { useReducer } from "react"
import reducer from "../../reducer"
import Increment from "../../components/increment/Increment"
import Decrement from "../../components/decrement/Decrement"

export default function ReducerLogic (){
    const [state, dispatch] = useReducer(reducer, {count: 0})
    return (
        <>
            <Decrement dispatch={dispatch}/>
            <span>{state.count}</span>
            <Increment dispatch={dispatch}/>
            
        </>
    )
}