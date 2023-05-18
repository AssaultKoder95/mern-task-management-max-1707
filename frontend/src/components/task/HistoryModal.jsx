/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
import React from 'react';
import Modal from 'react-modal';
import HistoryItem from './HistoryItem';
import classes from './Modal.module.scss';

function HistoryModal({ isOpen, closeModal, list }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={classes.modal}
            contentLabel="Add Task Modal"
        >
            <h1> Changes </h1>
            <button type="button" className={classes.close} onClick={closeModal}>X</button>
            {list.length > 0 ? (
                <table className={classes.historyList_table}>
                    <tbody>
                        {list?.map((item) => <HistoryItem key={Math.random()} item={item} />)}
                    </tbody>
                </table>
            ) : (
                ''
            )}
        </Modal>
    );
}

export default HistoryModal;
