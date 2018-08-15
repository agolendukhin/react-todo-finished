import React, { Component } from 'react';
import '../node_modules/todomvc-app-css/index.css';
import { getRandomTasks } from './api';
import _ from 'lodash';

class App extends Component {
  //1. Add a task | add
  //2. Remove a task | delete
  //3. Mark completed | update
  //4. Rename a task | update

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskText: 'todo'
    };
  }

  addTask = (e) => {
    const text = this.state.newTaskText;

    const tasks = this.state.tasks;
    const lastId = _.maxBy(tasks, 'id');

    this.setState({
      tasks: [
        ...tasks,
        {
          id: lastId + 1,
          text,
          completed: false
        }
      ]
    })
  };

  removeTask = (taskId) => {
    const tasks = this.state.tasks;

    const updatedTasks = tasks.filter(t => t.id !== taskId);

    this.setState({
      tasks: updatedTasks
    });
  };

  markCompletedTask = (taskId, e) => {
    const tasks = this.state.tasks;
    let updatedTasks = [];

    tasks.forEach(task => {
      if (task.id !== taskId) updatedTasks.push(task);
      updatedTasks.push({
        ...task,
        completed: !task.completed
      });
    });

    this.setState({
      tasks: updatedTasks
    });
  };

  renameTask = (taskId, e) => {
    const text = _.get(e, ['target', 'value'], '');

    const tasks = this.state.tasks;
    let updatedTasks = [];

    tasks.forEach(task => {
      if (task.id !== taskId) updatedTasks.push(task);
      updatedTasks.push({
        ...task,
        text
      });
    });

    this.setState({
      tasks: updatedTasks
    });
  };

  updateNewTaskText = (e) => {
    const newTaskText = _.get(e, ['target', 'value'], '');

    this.setState({
      newTaskText
    });
  };

  fetchTasks = async () => {
    let tasks = await getRandomTasks();

    tasks = tasks.map(t => {
      return {
        id: +t.id,
        text: t.text,
        completed: t.completed
      }
    });

    this.setState({tasks});
  };

  componentDidMount() {
    this.fetchTasks();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?"></input>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox"></input>
          <ul className="todo-list">
            <li>
              <div className="view">
                <input className="toggle" type="checkbox"></input>
                <label>Todo label</label>
                <button className="destroy"></button>
              </div>
            </li>
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>2</strong>
            <span> </span>
            <span>items</span>
            <span> left</span>
          </span>
          <ul className="filters">
            <li><a href="#/" className="selected">All</a></li>
            <span> </span>
            <li ><a href="#/active" >Active</a></li>
            <span> </span>
            <li ><a href="#/completed">Completed</a></li>
          </ul>
        </footer>
      </section>
    );
  }
}

export default App;
