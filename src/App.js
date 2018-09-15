import React, { Component } from 'react';
import './index.css';
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

    this.currentEditInput = React.createRef();
    this.currentEditingLi = React.createRef();
  }

  completedTasksCount = () => {
    return this.state.tasks.filter(t => !t.completed).length;
  }

  addTask = () => {
    const text = this.state.newTaskText;

    const tasks = this.state.tasks;

    this.setState({
      tasks: [
        ...tasks,
        {
          id: this.getNewId(tasks),
          text,
          completed: false
        }
      ]
    });
  };

  removeTask = (taskId) => {
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
    setTimeout(() => {this.currentEditInput.current.focus()}, 1)

    const tasks = this.state.tasks;
    let updatedTasks = [];
    tasks.forEach(task => {
      if (task.id !== taskId) {
        updatedTasks.push(task);
        return;
      }
      updatedTasks.push({
        ...task
      });
    });

    this.setState({
      tasks: updatedTasks,
      editing: true,
      editingId : taskId
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

  toggleAllTasks = () => {
    let tasks = this.state.tasks;
    let updatedTasks = [];

    tasks.forEach(task => {
      updatedTasks.push({
        ...task,
        completed: true
      })
    });
  };

  getNewId = (tasks) => {
    let lastId = _.get(_.maxBy(tasks, 'id'), 'id') || 0;
    return ++lastId;
  }

  clearCompleted = () => {
    const tasks = this.state.tasks;

    this.setState({
      tasks: tasks.filter(t => !t.completed)
    })
  }

  handleEditInputOnChange = (taskId, e) => {
    const newText = _.get(e, 'target.value', '')
    let updatedTasks = [];
    this.state.tasks.forEach(task => {
      if (task.id === taskId) {
        updatedTasks.push({
          ...task,
          text: newText
        })
        return;
      }
      updatedTasks.push(task);
    })
    
    this.setState({
      tasks: updatedTasks
    })
  }

  handleEditInputBlur = (completed) => {
    this.currentEditingLi.current.className = completed ? 'completed' : ''
  }

  handleEditInputKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.currentEditInput.current.blur();
    }
  }

  componentDidMount() {
    this.fetchTasks();
    const filter = window.location.hash.slice(2)
    if (filter) this.setState({filter})
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const classNameAll = this.state.filter === 'all' ? 'selected' : '';
    const classNameActive = this.state.filter === 'active' ? 'selected' : '';
    const classNameCompleted = this.state.filter === 'completed' ? 'selected' : '';

    const tasksCompletedCount = this.completedTasksCount()

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
          <input className="toggle-all"
           type="checkbox"
           onClick={this.toggleAllTasks}
           checked={false}
          ></input>
          <ul className="todo-list">
            {this.state.tasks.map((task, i) => {
              if (this.state.filter === 'active' && task.completed) return false;
              if (this.state.filter === 'completed' && !task.completed) return false;

              let completedLiClassName = task.completed ? 'completed' : '';
              let editInput = <input className="edit"></input>
              let liRef = null;
              if (this.state.editing && this.state.editingId === task.id) {
                liRef = this.currentEditingLi;
                completedLiClassName += ' editing';
                editInput = <input 
                              className="edit"
                              ref={this.currentEditInput}
                              value={task.text}
                              onChange={(e) => this.handleEditInputOnChange(task.id, e)}
                              onBlur={() => this.handleEditInputBlur(task.completed)}
                              onKeyPress={this.handleEditInputKeyPress}
                              >
                            </input>
              }
              return (<li key={i} className={completedLiClassName} ref={liRef}>
                <div className="view">
                  <input 
                    className="toggle"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => this.changeTaskCompleted(task.id)}>
                  </input>
                  <label onDoubleClick={(e) => this.renameTask(task.id, e)}>{task.text}</label>
                  <button 
                    className="destroy"
                    onClick={() => this.removeTask(task.id)}>
                  </button>
                </div>
                {editInput}
              </li>)
            })}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{tasksCompletedCount}</strong>
            <span> </span>
            <span>{tasksCompletedCount === 1 ? 'item' : 'items'}</span>
            <span> left</span>
          </span>
          <ul className="filters">
            <li><a href="#/" className={classNameAll} onClick={() => this.filterTasks('all')}>All</a></li>
            <span> </span>
            <li ><a href="#/active" className={classNameActive} onClick={() => this.filterTasks('active')}>Active</a></li>
            <span> </span>
            <li ><a href="#/completed" className={classNameCompleted} onClick={() => this.filterTasks('completed')}>Completed</a></li>
          </ul>
          <button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
        </footer>
      </section>
    );
  }
}

export default App;
