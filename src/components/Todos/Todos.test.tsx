import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import Todos from "./Todos";
import { generateId } from "../../utils/generateId";
import userEvent from '@testing-library/user-event'
// import mockAxios from "../../__mocks__/axios";

jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

const todos = [
    {
        id: generateId(),
        userId: generateId(),
        title: 'Title 1',
        body: 'Description 1',
        isCompleted: false
    },
    {
        id: generateId(),
        userId: generateId(),
        title: 'Title 2',
        body: 'Description 2',
        isCompleted: false
    },
    {
        id: generateId(),
        userId: generateId(),
        title: 'Title 3',
        body: 'Description 3',
        isCompleted: false
    },
]
  
// afterEach(() => {
//     // cleaning up the mess left behind the previous test
//     mockAxios.reset();
// });

describe('Todos', ()=> {
    it('should render list of todos', async() => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: todos
        })
    
        await act( async () => {
          render(<Todos/>)
        });

       todos.forEach((todo) => {
        expect(screen.getByText(todo.body)).toBeInTheDocument()
       })
 
    })

    it('should correclty delete todo', async() => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: [{
                id: generateId(),
                userId: generateId(),
                title: 'Title 1',
                body: 'Description 1',
                isCompleted: false
            }]
        })
    
        await act( async () => {
          render(<Todos/>)
        });

        const todo = screen.getByText('Title 1')
        expect(todo).toBeInTheDocument()

       const button = screen.getByRole('button', {
        name: /remove/i
      })

      fireEvent.click(button)

      expect(todo).not.toBeInTheDocument()
    })

    it('should correclty complete todo', async() => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: [{
                id: generateId(),
                userId: generateId(),
                title: 'Title 1',
                body: 'Description 1',
                isCompleted: false
            }]
        })
    
        await act( async () => {
          render(<Todos/>)
        });
      
        const doneBtn = screen.getByText('Done')
        expect(doneBtn).toBeInTheDocument()

        const button = screen.getByRole('button', {
            name: /done/i
          })

      fireEvent.click(button)

      expect(screen.getByText('Not Done')).toBeInTheDocument()

    })
    
})