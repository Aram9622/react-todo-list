import { useState } from 'react'
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import './style.css'
export default function TodoItem(props) {
    let [isEditing, setIsEditing] = useState(false)
    // console.log(props.data, 'todoitem')
    let handleEdit = () => {
        setIsEditing(!isEditing)
        if (document.querySelector(`.editButton`).innerHTML == `Save`) {
            let newval = document.querySelector(`.inputitle`).value
            props.data.title = newval;
            let getLocal = JSON.parse(window.localStorage.getItem('data'))
            getLocal.map((item) => {
                if (item.id == props.data.id) {
                    window.localStorage.setItem('data', JSON.stringify(props.data))
                }
            })

        }
    }

    return (
        <>

            {/* <div className="todo-item"> */}
                {/* <div className='checkbox'><input type="checkbox" onChange={() => { props.isComplete(props.data.id) }} /></div>
                {!isEditing ? <div className='title'>{props.data.isComplete ? <del>{props.data.title}</del> : props.data.title}</div> :
                    <div className='title' ><input type='text' style={{ border: 'none' }} className='title inputitle' defaultValue={props.data.title} /></div>
                } */}
                <TableRow key={props.index}>
                    <TableCell align="left" >
                        {props.data.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {!isEditing ? <div className='title'>{props.data.isComplete ? <del>{props.data.title}</del> : props.data.title}</div> :
                            <div className='title' ><input type='text' style={{ border: 'none' }} className='title inputitle' defaultValue={props.data.title} /></div>
                        }
                    </TableCell>
                    <TableCell align="left" >
                        <Button className='editButton' onClick={handleEdit} variant="contained" color="primary">{isEditing ? `Save` : `Edit`}</Button>
                    </TableCell>
                    <TableCell align="left" >
                        <Button className='removebutton' onClick={() => { props.removeItem(props.index) }} variant="contained" color="secondary">Delete</Button>

                    </TableCell>
                    <TableCell align="left" >
                        <Button className='archivebutton' onClick={() => { props.archiveitem(props.index) }} variant="contained" color="default">Archive</Button>
                    </TableCell>
                </TableRow>
                {/* <div className='buttonEdit'>
                    <Button className='editButton' onClick={handleEdit} variant="contained" color="primary">{isEditing ? `Save` : `Edit`}</Button>
                </div>
                <div className='buttonAction'>
                    <Button className='removebutton' onClick={() => { props.removeItem(props.index) }} variant="contained" color="secondary">Delete</Button>
                </div>
                <div className='buttonAction'>
                    <Button className='archivebutton' onClick={() => { props.archiveitem(props.index) }} variant="contained" color="default">Archive</Button>
                </div> */}
            {/* </div> */}

        </>
    )
}