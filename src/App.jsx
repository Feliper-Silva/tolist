import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import TaskDetails from './components/TaskDetails';
import './App.css';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Estudar Programação',
      completed: false
    },
    {
      id: '2',
      title: 'Ler Livros',
      completed: true
    }
  ]);
  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.cypress.io/todos?_limit=10'
      );
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleTaksClick = taskId => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) return { ...task, completed: !task.completed };
      return task;
    });
    setTasks(newTasks);
  };
  const handleTaskAddition = taskTitle => {
    const newTask = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false
      }
    ];
    setTasks(newTask);
  };
  const handleTaskDeletion = taskId => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  };
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <>
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks
                  tasks={tasks}
                  handleTaksClick={handleTaksClick}
                  handleTaskDeletion={handleTaskDeletion}
                />
              </>
            )}
          />
          <Route path="/:taskTitle" exact component={TaskDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
