import { RootState } from './Types'

export const initialStateMock = {
  todos: {
    todos: [
      {
        id: 1,
        text: 'todo1',
        completed: false,
      },
      {
        id: 2,
        text: 'todo2',
        completed: true,
      },
      {
        id: 3,
        text: 'todo3',
        completed: true,
      },
      {
        id: 4,
        text: 'todo4',
        completed: false,
      },
    ],
  },
} as RootState
