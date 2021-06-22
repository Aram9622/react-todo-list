export default function Decrement({dispatch}){
    function decrement(){
        dispatch({type: 'decrement'})
    }
    return (
        <>
            <button onClick={decrement}>-</button>
        </>
    )
}