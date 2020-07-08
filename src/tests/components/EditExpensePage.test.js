import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let history, startRemoveExpense, startEditExpense, wrapper;

beforeEach(() => {
	startRemoveExpense = jest.fn();
	startEditExpense = jest.fn();
	history = { push: jest.fn() }
	wrapper = shallow(
		<EditExpensePage
			expense={expenses[2]}
			history={history}
			startRemoveExpense={startRemoveExpense}
			startEditExpense={startEditExpense}
		/>
	);
});

test("should render the EditExpense page", () => {
	expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense function", () => {
	wrapper.find("ExpenseForm").prop("onSubmit")(expenses[2]);
	expect(history.push).toHaveBeenLastCalledWith("/");
	expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test("should handle startRemoveExpense function", () => {
	wrapper.find("button").simulate("click");
	expect(history.push).toHaveBeenLastCalledWith("/");
	expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[2].id);
});