import { addExpense, editExpense, removeExpense, startAddExpense } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const createMockStore = configureMockStore([thunk]);

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
	const action = addExpense(expenses[1]);
	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: expenses[1]
	})
});

test("should add and store expense to database", (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: "mouse",
		amount: 3000,
		note: "this one is better",
		createdAt: 10000
	}

	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "ADD_EXPENSE",
			expense: {
				id: expect.any(String),
				...expenseData
			}
		})
		done();
	})

});

test("should add and store default expense to database", () => {

})

// test("Should set up add expense action with default values", () => {
// 	const action = addExpense();
// 	expect(action).toEqual({
// 		type: "ADD_EXPENSE",
// 		expense: {
// 			description: "",
// 			note: "",
// 			amount: 0,
// 			createdAt: 0,
// 			id: expect.any(String)
// 		}
// 	})
// });