import axios, { AxiosError } from "axios"
import { config } from "../utils/config"
import type { Todo, TodoFromApi } from "../types"

type TodoServiceGetTodos = {
    status: number,
    todos: Todo[]
}

class TodoService {
    public getTodos = async (): Promise<TodoServiceGetTodos | undefined> => {
        try {
            const data = await axios.get<TodoFromApi[]>(config.apiUrl)
            const mappedTodos = this.mapTodos(data.data)

            return {
                status: data.status,
                todos: mappedTodos ?? []
            }
        } catch(error) {
            const message = (error as AxiosError<{ message: string }>).response?.data
            ?.message;
      
            throw message 
        }
    }

    public addTodo = async (todo: Todo): Promise<boolean> => {
        const data = await axios.post(config.apiUrl, {...todo})
        return true
    }


    private mapTodos = (todosFromApi: TodoFromApi[]): Todo[] => {
        return todosFromApi.map((todos) => ({
            ...todos,
            isCompleted: false
        }))
    }   

}

const todoService = new TodoService()

export default todoService