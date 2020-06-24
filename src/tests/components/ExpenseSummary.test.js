import React from "react";
import { shallow } from "enzyme";
import { ExpenseSummary } from "../../components/ExpenseSummary";
import expenses from "../fixtures/expenses";
import getExpenseTotal from "../../selectors/expense-total";

test("should render single expense summary", () => {
	const expense = [expenses[0]];
	const wrapper = shallow(
		<ExpenseSummary
			expenseCount={expense.length}
			expensesTotal={getExpenseTotal(expense)}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

test("should render multiple expenses summary", () => {
	const wrapper = shallow(
		<ExpenseSummary
			expenseCount={expenses.length}
			expensesTotal={getExpenseTotal(expenses)}
		/>
	);
	expect(wrapper).toMatchSnapshot();
});