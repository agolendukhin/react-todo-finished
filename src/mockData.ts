import { RootState } from './Types'

export const initialStateMock: RootState = {
  todos: {
    isFetching: false,
    todos: [
      {
        id: 1,
        text: 'todo1',
        completed: false,
        serverId: 'serverId',
        userId: 'userId',
      },
      {
        id: 2,
        text: 'todo2',
        completed: true,
        serverId: 'serverId',
        userId: 'userId',
      },
      {
        id: 3,
        text: 'todo3',
        completed: true,
        serverId: 'serverId',
        userId: 'userId',
      },
      {
        id: 4,
        text: 'todo4',
        completed: false,
        serverId: 'serverId',
        userId: 'userId',
      },
    ],
  },
  filters: {
    all: false,
    active: true,
    completed: false,
  },
  errors: {
    errors: [
      {
        id: '1',
        title: 'error title 1',
        message: 'error message 1',
      },
      {
        id: '2',
        title: 'error title 2',
        message: 'error message 2',
      },
    ],
  },
}

export const firebaseMock = { user: { uid: '12345' } }
