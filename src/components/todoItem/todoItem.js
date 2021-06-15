import { useState } from 'react'
import './style.css'
export default function TodoItem(props) {
    let [isEditing,setIsEditing] = useState(false)
    console.log(props.data, 'todoitem')
    let handleEdit = ()=>{
        setIsEditing(!isEditing)
        if(document.querySelector(`.editButton`).innerHTML == `Save`){
            let newval = document.querySelector(`.inputitle`).value
            props.data.title = newval;
        }
    }
    
    return (
        <>
            <div className="todo-item">
                <div className='checkbox'><input type="checkbox" onChange={()=>{props.isComplete(props.data.id)}} /></div>
                {!isEditing ? <div className='title'>{props.data.isComplete ? <del>{props.data.title}</del> : props.data.title}</div> :
                <div className='title' ><input type='text' style={{border:'none'}} className='title inputitle' defaultValue={props.data.title}/></div>
                }
                <div className='buttonEdit'><button className='editButton'  onClick={handleEdit}>{isEditing ? `Save` : `Edit`}</button></div>
                <div className='buttonAction'><button className='removebutton' onClick={() => { props.removeItem(props.index) }}>Delete</button></div>
            </div>
            
        </>
    )
}