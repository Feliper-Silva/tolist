import React from 'react';
import Task from '../Task';

const Tasks = ({ tasks, handleTaksClick, handleTaskDeletion }) => {
  return (
    <>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          handleTaksClick={handleTaksClick}
          handleTaskDeletion={handleTaskDeletion}
        />
      ))}
    </>
  );
};

export default Tasks;
