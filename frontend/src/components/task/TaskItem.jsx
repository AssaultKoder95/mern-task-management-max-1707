/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import classes from './TaskItem.module.scss';

function TaskItem({
  task, deleteTask, editTask, showTaskHistory
}) {
  return (
    <tr className={classes.task_item}>
      <td>
        {task.title.length > 10 ? `${task.title.substring(0, 10)}...` : task.title}
      </td>
      <td>{task.status}</td>
      <td>{moment(task.createdAt).format('Do MMM YY')}</td>
      <td>
        <button
          type="button"
          className={classes.editBtn}
          onClick={() => editTask(task._id)}
        >
          Edit
        </button>
        <button
          type="button"
          className={classes.historyBtn}
          onClick={() => showTaskHistory(task._id)}
        >
          History
        </button>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
