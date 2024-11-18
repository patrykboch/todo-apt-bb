import type { Todo } from "../../types"
import cn from 'classnames'

type TodoItemProps = {
    todo: Todo,
    handleIsCompletedChange: (todoId:string) => void,
    deleteTodo: (todoId:string) => void
}

const TodoItem = ({todo, handleIsCompletedChange, deleteTodo}: TodoItemProps) => {
    return (
        <div className="flex mb-4 items-center">
            <div className={cn("flex flex-col min-w-[500px]", {'line-through': todo.isCompleted})}>
                <p className="w-full text-grey-darkest">{todo.title}</p>
                <p>{todo.description}</p>
            </div>
            <button 
                onClick={()=> handleIsCompletedChange(todo.id)} 
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
            >
                {todo.isCompleted ? 'Not Done' : 'Done'}
            </button>
            <button onClick={()=> deleteTodo(todo.id)} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
        </div>
    )
}

export default TodoItem