import { useEffect, useState } from "react"
import TodoList from "../components/todoList/TodoList";
import Pagination from "react-js-pagination";
import Archive from "../components/archive/Archive";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './style.css'
import Header from "../components/header/Header";

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: '10px',
    },
}));

export default function Home() {
    const classes = useStyles();
    let [pageCount, setPageCount] = useState(window.localStorage.getItem('countPerPage') ? window.localStorage.getItem('countPerPage') : 3)
    let [todo, setTodo] = useState({
        id: Date.now(),
        title: '',
        isComplete: false
    })
    let [countCompleted, setCountCompleted] = useState(0)
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
        setPageCount(Number(e.target.value))
        window.localStorage.setItem('countPerPage', Number(e.target.value))
    }

    async function archivitem(id) {
        setArchiveData([
            ...archiveData,
            data[id]
        ]);
        setData(data.filter((item, index) => { return index !== id }))
        await new Promise((res) => {
            res([...archiveData, data[id]]);
        }).then((item) => {
            window.localStorage.setItem('archive', JSON.stringify(item));
        })

    }

    function activeitem(id) {
        setData([
            ...data,
            archiveData[id]
        ])
        setArchiveData(archiveData.filter((item, index) => { return index !== id }))
        let localArchive = JSON.parse(window.localStorage.getItem('archive'))
        let a = localArchive.filter((item, index) => {
            return index !== id
        })
        window.localStorage.setItem('archive', JSON.stringify(a))
        console.log(a);
    }
    let percentarrset = new Set()
    data.map((item) => {
        if (item.isComplete == true) {
            percentarrset.add(item.id)
        }
    })
    console.log(percentarrset.size == 0 && data.length == 0)
    return (
        <>
            <Header />
            <div className="form-todo">
                <h3>Title</h3>
                <input type="text" name='title' onChange={addTodoState} value={todo.title} />
                {/* <select name="" id="" onChange={filterItem}>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select> */}

                <FormControl className={classes.formControl}>
                    <Select
                        value={pageCount}
                        onChange={filterItem}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>
                <p></p>
                <Button onClick={() => addTodo(todo)} className='addbutton' variant="contained" color="primary">Add</Button>
                {/* <button onClick={() => addTodo(todo)} className='addbutton'>Add</button> */}
                {
                    data.length === 0 ? (<><p>No data to show</p></>) :
                        <TodoList todo={data} remove={removeitem} complete={CheckIsComplete} style={useStyles} page={activepage.activePage} itemCount={pageCount} archiveItem={archivitem} />
                }
                {
                    data.length === 0 ? null :
                        <Pagination
                            activePage={activepage.activePage}
                            itemsCountPerPage={pageCount}
                            totalItemsCount={data.length}
                            pageRangeDisplayed={pageCount}
                            onChange={handlePageChange}
                            hideNavigation={false}
                        />
                }
                <p style={percentarrset.size == data.length && data.length != 0 ? { color: 'green' } : percentarrset.size == 0 && data.length == 0 ? { display: 'none' } : null}>{`Completed: ${Math.round(percentarrset.size * 100 / data.length)}`}% </p>
                <Archive data={archiveData} activeItem={activeitem} className='archive' />
            </div>


        </>
    )
}