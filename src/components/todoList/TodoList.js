import './style.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TodoItem from '../todoItem/todoItem';

export default function TodoList(props) {
    let page = props.page;
    let item1 = props.itemCount * page;
    let item2 = item1 - 5;
    let sli = props.todo.slice(item2, item1)
                    
    return (
        <>
            <div className="todo-list">
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
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