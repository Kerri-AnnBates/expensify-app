import React from "react";
import Modal from 'react-modal';

const RemoveModal = (props) => (
	<Modal isOpen={props.isOpen}>
		<h3>Remove Expense</h3>
		<p>Are you sure you want to remove the {props.expense.description} expense?</p>
		<button
			className="button"
			onClick={props.onRemove}
		>Yes</button>
		<button className="button button--secondary" onClick={props.handleCloseModal} >No</button>
	</Modal>
);

export default RemoveModal;