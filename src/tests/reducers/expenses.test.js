import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
import moment from "moment";

test("should set default state", () => {
	const state = expensesReducer(undefined, { type: "@@INIT" });
	expect(state).toEqual([]);
});

test("should remove expense by id", () => {
	const action = {
		type: "REMOVE_EXPENSE",
		id: expenses[1].id
	}

	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
	const action = {
		type: "REMOVE_EXPENSE",
		id: "-1"
	}

	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test("should add an expense", () => {
	const newExpense = {
		id: "5",
		description: "Fast Food",
		note: "",
		amount: 600,
		createdAt: moment()
	}

	const action = {
		type: "ADD_EXPENSE",
		expense: newExpense
	}

	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, newExpense]);
});

test("should edit and expense", () => {
	const updates = {
		...expenses[2],
		amount: 2000
	}

	const action = {
		type: "EDIT_EXPENSE",
		id: expenses[2].id,
		updates
	}

	const state = expensesReducer(expenses, action);
	expect(state[2]).toEqual(updates);
});

test("should not edit expense if id not found", () => {
	const updates = {
		...expenses[2],
		amount: 2000
	}

	const action = {
		type: "EDIT_EXPENSE",
		id: "-1",
		updates
	}

	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test("should set expenses", () => {
	const action = {
		type: "SET_EXPENSES",
		expenses: [expenses[0]]
	}

	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0]]);
});
