import { Todo, Todos } from '../../Types'
import { db } from './Firebase'

export default {
  fetchTodos: (userId: string) => {
    return db
      .collection('todos')
      .where('userId', '==', userId)
      .get()
      .then(querySnapshot =>
        querySnapshot.docs.map(doc => ({ ...doc.data(), serverId: doc.id }))
      )
  },

  addTodo: (todo: Todo, userId: string) => {
    return db.collection('todos').add({ ...todo, userId })
  },

  removeTodo: (serverId: string) =>
    db
      .collection('todos')
      .doc(serverId)
      .delete(),

  updateTodo: (todo: Todo) =>
    db
      .collection('todos')
      .doc(todo.serverId)
      .update(todo),

  toggleAllTodos: (todos: Todos, completed: boolean | undefined) => {
    const batch = db.batch()

    todos.forEach(todo => {
      const ref = db.collection('todos').doc(todo.serverId)
      batch.update(ref, { ...todo, completed })
    })

    return batch.commit()
  },

  clearCompleted: (todos: Todos) => {
    const batch = db.batch()

    todos.forEach(todo => {
      if (todo.completed) {
        const ref = db.collection('todos').doc(todo.serverId)
        batch.delete(ref)
      }
    })

    return batch.commit()
  },
}
