/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { BsClipboard, BsTrash, BsClockHistory } from 'react-icons/bs';
import classes from './TaskItem.module.scss';

const statusObj = {
  todo: 'To do', inprogress: 'In progress', completed: 'Completed', rejected: 'Rejected'
};

function TaskItem({
  task, deleteTask, editTask, showTaskHistory
}) {
  return (
    <tr className={classes.task_item}>
      <td>
        {task?.title?.length > 10 ? `${task?.title?.substring(0, 10)}...` : task?.title}
      </td>
      <td>{statusObj[task?.status]}</td>
      <td>{moment(task?.createdAt).format('Do MMM YY')}</td>
      <td>
        <button
          type="button"
          className={classes.editBtn}
          onClick={() => editTask(task?._id)}
        >
          <BsClipboard />
        </button>
        <button
          type="button"
          className={classes.historyBtn}
          onClick={() => showTaskHistory(task?._id)}
        >
          <BsClockHistory />
        </button>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTask(task?._id)}
        >
          <BsTrash />
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
