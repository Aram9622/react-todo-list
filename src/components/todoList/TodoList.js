import './style.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TodoItem from '../todoItem/todoItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
export default function TodoList(props) {
    let page = props.page;
    let item1 = props.itemCount * page;
    let item2 = item1 - props.itemCount;
    let sli = props.todo.slice(item2, item1)

    let [filterBy, setFilterBy] = useState(true)
    function filterByTodo(e) {
        setFilterBy(e.target.value)
      
        sli = props.todo.reverse()
       
    }
    return (
        <>
            <div className='filter-by'>
                <p>Filter By</p>
                <FormControl>
                    <Select
                        value={filterBy}
                        onChange={filterByTodo}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={true}>ASC</MenuItem>
                        <MenuItem value={false}>DESC</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="todo-list">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell align="left">Edit</TableCell>
                                <TableCell align="left">Delete</TableCell>
                                <TableCell align="left">Archive</TableCell>
                                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        < TableBody >
                            {sli.map((item, index) => {

                                return (
                                    <>
                                        <TodoItem data={item} index={index} removeItem={props.remove} isComplete={props.complete} archiveitem={props.archiveItem} />
                                    </>
                                )

                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}