import { useCallback, useEffect, useState } from "react"
import type { Todo, TodoFromApi } from "../../types"
import TodoList from "../TodoList/TodoList"
import TodoForm from "../TodoForm/TodoForm"
import todoService from "../../service/TodoService"
import Loader from "../Loader/Loader"

type Statuses = "readyToFetch" | "isLoading" | "done" | "error"

const Todos = () => {
    const [todos, setTodos] = useState<Todo[] | []>([])
    const [status, setStatus] = useState<Statuses>("readyToFetch")
    const [error, setError] = useState<any>(null)

    const getTodos = useCallback(async ()=> {
        try {
            setStatus('isLoading')
            const data = await todoService.getTodos()
            setTodos(data?.todos ?? [])
        
        } catch (e) {
            if(typeof e === 'string')
            setStatus('error')
            setError(e)
        } finally {
            setStatus('done')
        }
    }, [])
    
    useEffect(()=> {
        getTodos()
    }, [])


    const onSubmitForm = async(todo: Todo) => {
        setTodos([todo, ...todos])
        await todoService.addTodo(todo)
    }   

    const handleIsCompletedChange = (todoId:string) => {
        const updatedTodos = todos.map((todo) => {
            if(todo.id === todoId) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    const deleteTodo = (todoId:string) => {
        const newList = todos.filter((todo)=> todo.id !==todoId)
        setTodos(newList)
    }

    return (
        <div className="container">
            {error && <p>{error}</p>}
            <TodoForm onSubmit={onSubmitForm}/>
            {status === 'isLoading' && <Loader />}
            <TodoList handleIsCompletedChange={handleIsCompletedChange} deleteTodo={deleteTodo} todos={todos}/>
        </div>
    )
}

export default Todos