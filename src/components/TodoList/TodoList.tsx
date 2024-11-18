import type { Todo } from "../../types"
import TodoItem from "../TodoItem/TodoItem"

type TodoListProps = {
    todos: Todo[] | null,
    handleIsCompletedChange: (todoId: string) => void,
    deleteTodo: (todoId: string) => void
}

const TodoList = ({todos, handleIsCompletedChange, deleteTodo}: TodoListProps) => {
    if(!todos?.length) return <p>There is no todos!</p>

    return (
        <ul>
            {todos.map((todo)=> <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} handleIsCompletedChange={handleIsCompletedChange}/>)}
        </ul>
    )
}

export default TodoList