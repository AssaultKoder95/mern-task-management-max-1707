/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import classes from './TaskItem.module.scss';

function HistoryItem({
  item
}) {
  return (
    <tr className={classes.task_item}>
      <td>
        {item.changes}
        {' '}
      </td>
      <td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm a")}</td>
    </tr>
  );
}

export default HistoryItem;
