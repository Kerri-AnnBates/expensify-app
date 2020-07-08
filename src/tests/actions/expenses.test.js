import {
	addExpense,
	editExpense,
	startEditExpense,
	removeExpense,
	startAddExpense,
	setExpenses,
	startSetExpenses,
	startRemoveExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};

	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };
	});

	database.ref("expenses").set(expensesData).then(() => done());
});

test("Should set up remove expense action object", () => {
	const action = removeExpense({ id: "123abc" });
	expect(action).toEqual({
		type: "REMOVE_EXPENSE",
		id: "123abc"
	})
});

test("should remove expenses from firebase", (done) => {
	const store = createMockStore({});
	const id = expenses[0].id;

	store.dispatch(startRemoveExpense(id)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "REMOVE_EXPENSE",
			id
		});

		return database.ref(`expenses/${actions[0].id}`).once("value");
	}).then((snapshot) => {
		expect(snapshot.val()).toBe(null);
		done();
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

test("Should edit expenses from firebase", (done) => {
	const store = createMockStore({});
	const id = expenses[0].id;
	const updates = {
		amount: 100
	}

	store.dispatch(startEditExpense(id, updates)).then(() => {
		const action = store.getActions();
		expect(action[0]).toEqual({
			type: "EDIT_EXPENSE",
			id,
			updates
		});

		return database.ref(`expenses/${id}`).once("value");
	}).then((snapshot) => {
		expect(snapshot.val().amount).toBe(updates.amount);
		done();
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

		return database.ref(`expenses/${actions[0].expense.id}`).once("value");

	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});

});

test("should add and store default expense to database", (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: "",
		note: "",
		amount: 0,
		createdAt: 0
	}

	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "ADD_EXPENSE",
			expense: {
				id: expect.any(String),
				...expenseData
			}
		})

		return database.ref(`expenses/${actions[0].expense.id}`).once("value");

	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
})

test("should setup set expense action object with data", () => {
	const action = setExpenses(expenses);

	expect(action).toEqual({
		type: "SET_EXPENSES",
		expenses
	});

});

test("should fetch the expenses from firebase", (done) => {
	const store = createMockStore({});

	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "SET_EXPENSES",
			expenses
		});
		done();
	})
});