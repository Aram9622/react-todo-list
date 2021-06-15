import { useEffect, useState } from "react"
import TodoList from "../components/todoList/TodoList";
import Pagination from "react-js-pagination";
import './style.css'
export default function Home() {
    let [todo, setTodo] = useState({
        id: Date.now(),
        title: '',
        isComplete: false
    })

    
    let [data, setData] = useState([]);
    let [activepage, setActivePage] = useState({
        activePage:1,
    })

    let [filter,setFilter] = useState(1)
    function addTodoState(e) {
        setTodo({
            ...todo,
            id: Date.now(),
            title: e.target.value
        })
    }

    function addTodo(e) {
        setData([
            ...data,
            todo
        ])


        setTodo({
            ...todo,
            title: ''
        })
    }

    function removeitem(id) {
        setData(data.filter((item, index) => { return index !== id }))
    }

    function CheckIsComplete(e) {
        console.log(e);
        setData(
            data.map(item => {
                if (item.id === e) {
                    item.isComplete = !item.isComplete
                }
                return item
            })
        )
    }

    function handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        setActivePage({activePage: pageNumber});
      }

      function filterItem(e){
          setFilter(Number(e.target.value))
      }
    return (
        <>
            <div className="form-todo">
                <h3>Title</h3>
                <input type="text" name='title' onChange={addTodoState} value={todo.title} />
                <select name="" id="" onChange={filterItem}>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                <p></p>
                <button onClick={addTodo} className='addbutton'>Add</button>
                <TodoList todo={data} remove={removeitem} complete={CheckIsComplete} page={activepage.activePage} itemCount={filter}/>
                <Pagination
                    activePage={activepage.activePage}
                    itemsCountPerPage={filter}
                    totalItemsCount={data.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    hideNavigation={false}
                    />
            </div>


        </>
    )
}