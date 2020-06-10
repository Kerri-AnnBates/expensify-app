import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("Should set up remove expense action object", () => {
	const action = removeExpense({ id: "123abc" });
	expect(action).toEqual({
		type: "REMOVE_EXPENSE",
		id: "123abc"
	})
});

test("Should set up edit expense action object", () => {
	const action = editExpense("123", { note: "New note" });
	expect(action).toEqual({
		type: "EDIT_EXPENSE",
		id: "123",
		updates: {
			note: "New note"
		}
	})
});

test("Should set up add expense action with provided values", () => {
	const expenseData = {
		description: "Rent",
		note: "This was last month's rent",
		amount: 109500,
		createdAt: 1000
	}

	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: {
			...expenseData,
			id: expect.any(String)
		}

	})
});

test("Should set up add expense action with default values", () => {
	const action = addExpense();
	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: {
			description: "",
			note: "",
			amount: 0,
			createdAt: 0,
			id: expect.any(String)
		}
	})
});