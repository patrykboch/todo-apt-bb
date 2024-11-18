import { useEffect, useState } from "react"
import type { Todo } from "../../types"
import TodoList from "../TodoList/TodoList"
import { todosMock } from "../../mocks"
import TodoForm from "../TodoForm/TodoForm"



const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(()=> {
        setTodos(todosMock)
    }, [])


    const onSubmitForm = (todo: Todo) => {
        setTodos([...todos, todo])
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
            <TodoForm onSubmit={onSubmitForm}/>
            <TodoList handleIsCompletedChange={handleIsCompletedChange} deleteTodo={deleteTodo} todos={todos}/>
        </div>
    )
}

export default Todos