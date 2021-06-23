import { useEffect, useState } from "react"
import TodoList from "../components/todoList/TodoList";
import Pagination from "react-js-pagination";
import Archive from "../components/archive/Archive";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './style.css'


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Home() {
    const classes = useStyles();
    let [todo, setTodo] = useState({
        id: Date.now(),
        title: '',
        isComplete: false
    })

    let [archiveData, setArchiveData] = useState([])
    let [data, setData] = useState(window.localStorage.getItem(`data`) ? JSON.parse(window.localStorage.getItem(`data`)) : []);
    let [activepage, setActivePage] = useState({
        activePage: window.localStorage.getItem(`page`) ? window.localStorage.getItem(`page`) : 1,
    })
    let [filter, setFilter] = useState(1)
    function addTodoState(e) {
        setTodo({
            ...todo,
            id: Date.now(),
            title: e.target.value
        })
    }

    let addTodo = async (item) => {

        if (!todo.title == '') {
            setData([
                ...data,
                todo
            ]);
            setTodo({
                ...todo,
                title: ''
            });
            await new Promise(res => {
                res([...data, todo])
            }).then(res => {
                window.localStorage.setItem('data', JSON.stringify(res));
            })
            document.querySelector('input').style.border = '2px solid #e5e5e5';
        }
        else {
            document.querySelector('input').style.border = '2px solid red';
        }

    }

    function removeitem(id) {
        console.log(id, `IDDDDDDDDD`);
        let dataLocal = JSON.parse(window.localStorage.getItem('data'))
        let filterData = dataLocal.filter((item, index) => { return index !== id });
        setData(filterData)
        window.localStorage.setItem(`data`, JSON.stringify(filterData))
    }

    function CheckIsComplete(e) {
        let localdata = JSON.parse(window.localStorage.getItem('data'));
        setData(
            data.map((item, index) => {
                if (item.id === e) {
                    localdata[index].isComplete = !item.isComplete;
                    item.isComplete = !item.isComplete;
                }
                return item
            })
        )
        // console.log(localdata)
        window.localStorage.setItem('data', JSON.stringify(localdata))
    }

    function handlePageChange(pageNumber) {
        setActivePage({ activePage: pageNumber });
        window.localStorage.setItem('page', pageNumber);
    }

    function filterItem(e) {
        setFilter(Number(e.target.value))
    }

    function archivitem(id) {
        setArchiveData([
            ...archiveData,
            data[id]
        ]);
        setData(data.filter((item, index) => { return index !== id }))
    }

    function activeitem(id) {
        setData([
            ...data,
            archiveData[id]
        ])
        setArchiveData(archiveData.filter((item, index) => { return index !== id }))
    }
    console.log(window.localStorage.getItem('page'),)
    return (
        <>
            <div className="form-todo">
                <h3>Title</h3>
                <input type="text" name='title' onChange={addTodoState} value={todo.title} />
                {/* <select name="" id="" onChange={filterItem}>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select> */}
                <p></p>
                <Button onClick={() => addTodo(todo)} className='addbutton' variant="contained" color="primary">Add</Button>
                {/* <button onClick={() => addTodo(todo)} className='addbutton'>Add</button> */}
                {
                    data.length === 0 ? (<><p>No data to show</p></>) :
                        <TodoList todo={data} remove={removeitem} complete={CheckIsComplete} style={useStyles} page={activepage.activePage} itemCount={5} archiveItem={archivitem} />
                }
                {
                    data.length === 0 ? null :
                        <Pagination
                            activePage={activepage.activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={data.length}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            hideNavigation={false}
                        />
                }


                {archiveData.length > 0 ? <Archive data={archiveData} activeItem={activeitem} className='archive' /> : null}
            </div>


        </>
    )
}