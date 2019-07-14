import { TDB, Todo, Todos } from '../../Types'

export default {
  fetchTodos: (db: TDB) =>
    db
      .collection('todos')
      .get()
      .then(querySnapshot =>
        querySnapshot.docs.map(doc => ({ ...doc.data(), serverId: doc.id }))
      ),

  addTodo: (db: TDB, todo: Todo) => db.collection('todos').add(todo),

  removeTodo: (db: TDB, serverId: string) =>
    db
      .collection('todos')
      .doc(serverId)
      .delete(),

  updateTodo: (db: TDB, todo: Todo) =>
    db
      .collection('todos')
      .doc(todo.serverId)
      .update(todo),

  toggleAllTodos: (db: TDB, todos: Todos, completed: boolean) => {
    const batch = db.batch()

    todos.forEach(todo => {
      const ref = db.collection('todos').doc(todo.serverId)
      batch.update(ref, { ...todo, completed })
    })

    return batch.commit()
  },

  clearCompleted: (db: TDB, todos: Todos) => {
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
