import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';

import TaskItem from './TaskItem';
import HistoryModal from './HistoryModal';
import classes from './TaskList.module.scss';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isTaskHistoryModalOpen, setTaskHistoryModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({});
  const [taskHistory, setTaskHistory] = useState([]);

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
    setIsAddingNew(!isAddingNew);
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
      setIsAddingNew(false);
      setNewTask({});
      setTaskList([{ ...data }, ...taskList]);
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

  // const editTask = , showTaskHistory

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
    setIsAddingNew(false);
  };

  const closeTaskHistoryModal = () => {
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

      <Modal
        isOpen={isAddingNew}
        onRequestClose={closeModal}
        style={classes.modal}
        contentLabel="Add Task Modal"
      >
        <h1>Add New Task</h1>
        <button type="button" style={{ float: 'right' }} onClick={closeModal}>X</button>
        <form className={classes.addNewForm} onSubmit={addNewTask}>
          <label htmlFor="title">
            Title:
            <input name="title" type="text" required onChange={handleChange} />
          </label>
          <br />
          <label htmlFor="description">
            Description:
            <input
              name="description"
              type="text"
              required
              onChange={handleChange}
            />
          </label>

          <label htmlFor="dueDate">
            Due Date:
            <input
              name="dueDate"
              type="date"
              required
              min={new Date().toISOString().substring(0, 10)}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="status">
            Status:
            <select name="status" onChange={handleChange}>
              <option value="todo" label="To do" />
              <option value="inprogress" label="In progress" />
              <option value="completed" label="Completed" />
              <option value="rejected" label="Rejected" />
            </select>
          </label>

          <br />
          <br />
          <button type="submit">{0 ? <p /> : 'Add Task'}</button>
        </form>
      </Modal>

      {taskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {taskList.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                deleteTask={deleteTask}
                showTaskHistory={showTaskHistory}
              />
            ))}
          </tbody>
        </table>
      ) : (
        ''
      )}

      <HistoryModal
        isOpen={isTaskHistoryModalOpen}
        closeModal={closeTaskHistoryModal}
        list={taskHistory}
      />
    </div>
  );
}

export default TaskList;
