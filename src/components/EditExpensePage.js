import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

const EditExpensePage = (props) => {

	return (
		<div>
			<ExpenseForm
				expense={props.expense}
				onSubmit={(expense) => {
					const id = props.expense.id;

					props.dispatch(editExpense(id, expense));
					props.history.push("/");
				}}
			/>
			<button onClick={() => {
				const id = props.expense.id;

				props.dispatch(removeExpense({ id }));
				props.history.push("/");
			}}>Remove</button>
		</div>
	)
};

const mapStateToProps = (state, props) => {

	return {
		expense: state.expenses.find((expense) => expense.id === props.match.params.id)
	}
}

export default connect(mapStateToProps)(EditExpensePage);