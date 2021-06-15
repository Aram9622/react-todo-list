import './style.css'
import TodoItem from '../todoItem/todoItem'
export default function TodoList(props) {
    let page = props.page;
    let item1 = props.itemCount * page;
    let item2 = item1-5;
    let sli = props.todo.slice(item2, item1)
    return (
        <>
            <div className="todo-list">
                {sli.map((item, index) => {
                    
                        return (
                            <>
                                <TodoItem data={item} index={index} removeItem={props.remove} isComplete={props.complete}/>
                            </>
                        )
                    
                })}
            </div>
        </>
    )
}