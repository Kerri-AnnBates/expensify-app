import React from "react";
import Modal from 'react-modal';

const RemoveModal = (props) => (
	<Modal isOpen={props.isOpen} className="modal">
		<div className="modal__title">
			<div className="content-container">
				<h3>Remove Expense</h3>
			</div>
		</div>
		<div className="modal__body">
			<div className="content-container">
				<p>Are you sure you want to remove the <span>{props.expense.description}</span> expense?</p>
				<button
					className="button"
					onClick={props.onRemove}
				>Yes</button>
				<button className="button button--secondary" onClick={props.handleCloseModal} >No</button>
			</div>
		</div>
	</Modal>
);

export default RemoveModal;