import React, { Component } from 'react';
import '../node_modules/todomvc-app-css/index.css';
import { getRandomTasks } from './api';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskText: 'todo'
    };
  }

  addTask = (e) => {

  };

  removeTask = (taskId) => {

  };

  markCompletedTask = (taskId, e) => {

  };

  renameTask = (taskId, e) => {

  };

  updateNewTaskText = (e) => {

  };

  fetchTasks = async () => {

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
