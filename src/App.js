import React, {useEffect} from 'react';
import TodoList from './Todo/TodoList'
import Context from "./context";
import Loader from "./loader";
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(() => new Promise(resolve => {
    setTimeout(() => {
        resolve(import('./Todo/addTodo'))
    }, 2000)
}))

function App() {
    const [todos, setTodos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos)
                    setLoading(false)
                }, 2000)
            })
    }, [])

    const toggleTodo = (id) => {
        setTodos(
            todos.map(todo => {
            if(todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }))
    }

    const removeTodo = (id) => {
        setTodos(
            todos.filter(todo => todo.id !== id)
        )
    }

    const addTodo = (title) => {
        setTodos(todos.concat([
            {
            title,
            id: Date.now(),
            completed: false
        }
        ])
        )
    }

    return (
        <Context.Provider value={{removeTodo: removeTodo}}>
            <div className='wrapper'>
                <h1>React</h1>
                <Modal />

                <React.Suspense fallback={<p><Loader /></p>}>
                    <AddTodo onCreate={addTodo}/>
                </React.Suspense>


                {loading && <Loader />}
                {todos.length ? (
                    <TodoList  todos={todos} onToggle={toggleTodo}/>
                ) : loading ? null : (
                    <p>No todos!</p>
                )}
            </div>
        </Context.Provider>
  )
}

export default App;
