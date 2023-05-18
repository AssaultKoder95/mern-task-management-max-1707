import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import TaskItem from './TaskItem';
import HistoryModal from './HistoryModal';
import AddEditTaskModal from './AddEditTaskModal';
import classes from './TaskList.module.scss';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNewOrEditingTask, setIsAddingNewOrEditingTask] = useState(false);
  const [isTaskHistoryModalOpen, setTaskHistoryModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({});
  const [taskHistory, setTaskHistory] = useState([]);
  const [existingTask, setExistingTask] = useState({});

  const getTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks/mytasks');
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addNewButtonClick = () => {
    setIsAddingNewOrEditingTask(!isAddingNewOrEditingTask);
  };

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.length <= 0) {
      toast.error('Task is empty');
      return;
    }
    try {
      const { data } = await axios.post('/api/tasks/', {
        ...newTask,
      });
      toast.success('New task added');
      setIsAddingNewOrEditingTask(false);
      setNewTask({});
      setExistingTask({});
      setTaskList([{ ...data }, ...taskList]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateExistingTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tasks/${existingTask[0]._id}`, {
        ...newTask,
      });
      toast.success('Task updated successfully');
      setIsAddingNewOrEditingTask(false);
      setNewTask({});
      setExistingTask({});
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted');
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = async (id) => {
    try {
      setExistingTask(taskList.filter((task) => task._id === id));
      setIsAddingNewOrEditingTask(true);
    } catch (err) {
      console.log(err);
    }
  };

  const showTaskHistory = async (id) => {
    try {
      const { data } = await axios.get(`/api/tasks/${id}/history`);
      setTaskHistory(data);
      setTaskHistoryModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setNewTask({});
    setExistingTask({});
    setIsAddingNewOrEditingTask(false);
  };

  const closeTaskHistoryModal = () => {
    setNewTask({});
    setExistingTask({});
    setTaskHistoryModalOpen(false);
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value, });
  };

  return (
    <div>
      <div className={classes.topBar}>
        <button
          type="button"
          className={classes.addNew}
          onClick={addNewButtonClick}
        >
          Add New
        </button>
      </div>

      {taskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {taskList.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                deleteTask={deleteTask}
                showTaskHistory={showTaskHistory}
                editTask={editTask}
              />
            ))}
          </tbody>
        </table>
      ) : (
        ''
      )}

      <AddEditTaskModal
        isOpen={isAddingNewOrEditingTask}
        closeModal={closeModal}
        handleChange={handleChange}
        addNewTask={addNewTask}
        updateExistingTask={updateExistingTask}
        task={existingTask[0]}
      />

      <HistoryModal
        isOpen={isTaskHistoryModalOpen}
        closeModal={closeTaskHistoryModal}
        list={taskHistory}
      />
    </div>
  );
}

export default TaskList;
