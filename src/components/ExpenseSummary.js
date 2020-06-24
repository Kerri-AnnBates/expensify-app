import React from "react";
import { connect } from "react-redux";
import getExpenseTotal from "../selectors/expense-total";
import selectExpenses from "../selectors/expenses";
import numeral from "numeral";

export const ExpenseSummary = ({ expenseCount, expensesTotal }) => (
	<div>
		<p>Viewing {expenseCount} {expenseCount === 1 ? `expense` : `expenses`} totaling {numeral(expensesTotal / 100).format("$0,0.00")}</p>
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