import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getExpenseTotal from "../selectors/expense-total";
import selectExpenses from "../selectors/expenses";
import numeral from "numeral";

export const ExpenseSummary = ({ expenseCount, expensesTotal }) => (
	<div className="page-header">
		<div className="content-container">
			<h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseCount === 1 ? `expense` : `expenses`} totaling <span>{numeral(expensesTotal / 100).format("$0,0.00")}</span></h1>
			<div className="page-header__actions">
				<Link to="/create" className="button">Add Expense</Link>
			</div>
		</div>
	</div>
);

const mapStateToProps = (state) => {
	const expenses = selectExpenses(state.expenses, state.filters);

	return {
		expenseCount: expenses.length,
		expensesTotal: getExpenseTotal(expenses)
	}
}

export default connect(mapStateToProps)(ExpenseSummary);