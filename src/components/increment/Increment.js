export default function Increment({dispatch}){
    function increment(){
        dispatch({type: 'increment'})
    }
    return (
        <>
            <button onClick={increment}>+</button>
        </>
    )
}