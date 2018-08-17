import React, { Component } from 'react';
import '../node_modules/todomvc-app-css/index.css';
import { getRandomTasks } from './api';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskText: '',
      filter: 'all',
      editing: false,
      editingId: null
    };
  }

  completedTasksCount = () => {
    return this.state.tasks.filter(t => !t.completed).length;
  }

  addTask = () => {
    const text = this.state.newTaskText;

    const tasks = this.state.tasks;
    const lastId = _.maxBy(tasks, 'id').id;

    this.setState({
      tasks: [
        ...tasks,
        {
          id: lastId + 1,
          text,
          completed: false
        }
      ]
    });
  };

  removeTask = (taskId) => {
    console.log('removeTask taskId', taskId);
    const tasks = this.state.tasks;

    const updatedTasks = tasks.filter(t => t.id !== taskId);

    this.setState({
      tasks: updatedTasks
    });
  };

  changeTaskCompleted = (taskId) => {
    const tasks = this.state.tasks;
    let updatedTasks = [];

    tasks.forEach(task => {
      if (task.id !== taskId) {
        updatedTasks.push(task);
        return;
      }

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

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addTask();
      this.setState({
        newTaskText: ''
      });
    }
  }

  filterTasks = (filter) => {
    this.setState({filter});
  };

  componentDidMount() {
    this.fetchTasks();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const classNameAll = this.state.filter === 'all' ? 'selected' : '';
    const classNameActive = this.state.filter === 'active' ? 'selected' : '';
    const classNameCompleted = this.state.filter === 'completed' ? 'selected' : '';

    return (
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <input 
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.updateNewTaskText}
            onKeyPress={this.handleKeyPress}
            value={this.state.newTaskText}>
          </input>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox"></input>
          <ul className="todo-list">
            {this.state.tasks.map(task => {
              if (this.state.filter === 'active' && task.completed) return false;
              if (this.state.filter === 'completed' && !task.completed) return false;

              let completedLiClassName = task.completed ? 'completed' : '';
              if (this.state.editing && this.state.editingId === task.id) completedLiClassName += ' editing';
              return (<li className={completedLiClassName}>
                <div className="view">
                  <input 
                    className="toggle"
                    type="checkbox"
                    checked={task.completed}
                    onClick={() => this.changeTaskCompleted(task.id)}>
                  </input>
                  <label dbclick={(e) => this.renameTask(task.id, e)}>{task.text}</label>
                  <button 
                    className="destroy"
                    onClick={() => this.removeTask(task.id)}>
                  </button>
                </div>
              </li>)
            })}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.completedTasksCount()}</strong>
            <span> </span>
            <span>items</span>
            <span> left</span>
          </span>
          <ul className="filters">
            <li><a href="#/" className={classNameAll} onClick={() => this.filterTasks('all')}>All</a></li>
            <span> </span>
            <li ><a href="#/active" className={classNameActive} onClick={() => this.filterTasks('active')}>Active</a></li>
            <span> </span>
            <li ><a href="#/completed" className={classNameCompleted} onClick={() => this.filterTasks('completed')}>Completed</a></li>
          </ul>
        </footer>
      </section>
    );
  }
}

export default App;
