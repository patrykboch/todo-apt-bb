import type { Todo } from "../types";
import { generateId } from "../utils/generateId";

export const todosMock: Todo[] = [
    {
        id: generateId(),
        title: 'Title 1',
        description: 'Description 1',
        isCompleted: false
    },
    {
        id: generateId(),
        title: 'Title 2',
        description: 'Description 2',
        isCompleted: false
    },
    {
        id: generateId(),
        title: 'Title 3',
        description: 'Description 3',
        isCompleted: false
    },
    {
        id: generateId(),
        title: 'Title 4',
        description: 'Description 4',
        isCompleted: false
    },
]