import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let history, removeExpense, editExpense, wrapper;

beforeEach(() => {
	removeExpense = jest.fn();
	editExpense = jest.fn();
	history = { push: jest.fn() }
	wrapper = shallow(
		<EditExpensePage
			expense={expenses[2]}
			history={history}
			removeExpense={removeExpense}
			editExpense={editExpense}
		/>
	);
});

test("should render the EditExpense page", () => {
	expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense function", () => {
	wrapper.find("ExpenseForm").prop("onSubmit")(expenses[2]);
	expect(history.push).toHaveBeenLastCalledWith("/");
	expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test("should handle removeExpense function", () => {
	wrapper.find("button").simulate("click");
	expect(history.push).toHaveBeenLastCalledWith("/");
	expect(removeExpense).toHaveBeenLastCalledWith(expenses[2].id);
});