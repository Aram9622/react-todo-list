import { useState } from 'react'
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ArchiveIcon from '@material-ui/icons/Archive';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css'
export default function TodoItem(props) {
    let [isEditing, setIsEditing] = useState(false)
    console.log(isEditing)
    let styles = {
        row: {
            backgroundColor: 'rgb(35 118 31 / 50%)'
        }
    }
    let handleEdit = (e) => {
        setIsEditing(!isEditing)
        // console.log(document.querySelector(`.editButton`).innerHTML);
        if (isEditing == true) {
            let newval = document.querySelector(`.inputitle`).value
            props.data.title = newval;
            let getLocal = JSON.parse(window.localStorage.getItem('data'))
            let newmap = getLocal.map((item) => {
                if (item.id == e) {
                    item.title = props.data.title
                }
                return item
            })
            window.localStorage.setItem('data', JSON.stringify(newmap))

        }
    }

    const aaa = (e) => { 
        props.isComplete(props.data.id);
    
    }

    return (
        <>

            {/* <div className="todo-item"> */}
            {/* <div className='checkbox'><input type="checkbox" onChange={() => { props.isComplete(props.data.id) }} /></div>
                {!isEditing ? <div className='title'>{props.data.isComplete ? <del>{props.data.title}</del> : props.data.title}</div> :
                    <div className='title' ><input type='text' style={{ border: 'none' }} className='title inputitle' defaultValue={props.data.title} /></div>
                } */}
            <TableRow hover key={props.index} style={props.data.isComplete ? styles.row : null} onClick={()=>{props.isComplete(props.data.id)}}>
                <TableCell align="left" >
                    <Checkbox
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={aaa}
                        checked={props.data.isComplete ? 'checked' : false}
                    />
                    {/* <div className='checkbox'><input type="checkbox" onChange={() => { props.isComplete(props.data.id) }} /></div> */}
                    {/* {props.data.id} */}
                </TableCell>
                <TableCell component="th" scope="row" >
                    {!isEditing ? <div className='title'>{props.data.title}</div> :
                        <div className='title' ><input type='text' style={{ border: 'none' }} className='title inputitle' defaultValue={props.data.title} /></div>
                    }
                </TableCell>
                <TableCell align="left" >
                    <Button className='editButton' disabled={props.data.isComplete ? 'disabled' : false} startIcon={isEditing ? <SaveIcon /> : <EditIcon />} onClick={() => { handleEdit(props.data.id) }} variant="contained" color="primary">{isEditing ? `Save` : `Edit`}</Button>
                </TableCell>
                <TableCell align="left" >
                    <Button className='removebutton' disabled={props.data.isComplete ? 'disabled' : false} startIcon={<DeleteIcon />} onClick={() => { props.removeItem(props.index) }} variant="contained" color="secondary">Delete</Button>

                </TableCell>
                <TableCell align="left" >
                    <Button className='archivebutton' disabled={props.data.isComplete ? 'disabled' : false} startIcon={<ArchiveIcon />} onClick={() => { props.archiveitem(props.index) }} variant="contained" color="default">Archive</Button>
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