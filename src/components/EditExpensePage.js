import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import Modal from 'react-modal';
import RemoveModal from "./RemoveModal";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

Modal.setAppElement("#app");

export class EditExpensePage extends React.Component {
	state = {
		isOpen: false
	}

	onSubmit = (expense) => {
		const id = this.props.expense.id;

		this.props.startEditExpense(id, expense);
		this.props.history.push("/");
	}

	onRemove = () => {
		const id = this.props.expense.id;

		this.props.startRemoveExpense(id);
		this.props.history.push("/");
	}

	handleOpenModal = () => {
		this.setState(() => {
			return {
				isOpen: true
			}
		});
	}

	handleCloseModal = () => {
		this.setState(() => {
			return {
				isOpen: false
			}
		});
	}

	render() {
		return (
			<div>
				<div className="page-header">
					<div className="content-container">
						<h1 className="page-header__title">Edit Expense</h1>
					</div>
				</div>
				<div className="content-container">
					<ExpenseForm
						expense={this.props.expense}
						onSubmit={this.onSubmit}
					/>
					<button onClick={this.handleOpenModal} className="button button--secondary">Remove Expense</button>
				</div>
				<RemoveModal
					isOpen={this.state.isOpen}
					expense={this.props.expense}
					onRemove={this.onRemove}
					handleCloseModal={this.handleCloseModal}
					onRequestClose={this.handleCloseModal}
					contentLabel="Remove expense"
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find((expense) => expense.id === props.match.params.id)
	}
}

const mapDispatchToProps = (dispatch) => ({
	startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
	startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);