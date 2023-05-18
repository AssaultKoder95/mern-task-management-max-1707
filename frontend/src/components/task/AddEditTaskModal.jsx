/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import classes from './Modal.module.scss';

function AddEditTaskModal({
    isOpen, closeModal, addNewTask, handleChange, task,
    updateExistingTask
}) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={classes.modal}
            contentLabel="Add Task Modal"
        >
            <h1>
                {task?.title ? 'Edit' : 'Add New'}
                {' '}
                Task
            </h1>
            <button type="button" className={classes.close} onClick={closeModal}>X</button>
            <form
                className={classes.addNewForm}
                onSubmit={task?.title ? updateExistingTask : addNewTask}
            >
                <label htmlFor="title">
                    Title:
                    <input name="title" type="text" required onChange={handleChange} defaultValue={task?.title} />
                </label>
                <br />
                <label htmlFor="description">
                    Description:
                    <input
                        name="description"
                        type="text"
                        required
                        onChange={handleChange}
                        defaultValue={task?.description}
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
                        defaultValue={task?.dueDate ? moment(task?.dueDate).format('YYYY-MM-DD') : undefined}
                    />
                </label>

                <label htmlFor="remindOn">
                    Remind On:
                    <input
                        name="remindOn"
                        type="date"
                        min={new Date().toISOString().substring(0, 10)}
                        max={task?.dueDate
                            ? new Date(task?.dueDate).toISOString().substring(0, 10)
                            : undefined}
                        onChange={handleChange}
                        defaultValue={task?.reminder?.remindOn ? moment(task?.reminder?.remindOn).format('YYYY-MM-DD') : undefined}
                    />
                </label>

                <label htmlFor="status">
                    Status:
                    <select name="status" onChange={handleChange} defaultValue={task?.status}>
                        <option value="todo" label="To do" />
                        <option value="inprogress" label="In progress" />
                        <option value="completed" label="Completed" />
                        <option value="rejected" label="Rejected" />
                    </select>
                </label>

                <br />
                <br />
                <button type="submit">
                    {task?.title ? 'Edit' : 'Add'}
                    {' '}
                    Task
                </button>
            </form>
        </Modal>
    );
}

export default AddEditTaskModal;
