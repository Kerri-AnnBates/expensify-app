import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_EXPENSE
const addExpense = (
	{
		description = "",
		note = "",
		amount = 0,
		createdAt = 0
	} = {}
) => ({
	type: "ADD_EXPENSE",
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
})

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
	type: "REMOVE_EXPENSE",
	id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
	type: "SET_TEXT_FILTER",
	text
});

// SORT_BY_DATE
const sortByDate = () => ({
	type: "SORT_BY_DATE"
});

// SORT_BY_AMOUNT
const sortByAmout = () => ({
	type: "SORT_BY_AMOUNT"
});

// SET_START_DATE
const setStartDate = (startDate) => ({
	type: "SET_START_DATE",
	startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({
	type: "SET_END_DATE",
	endDate
});

// Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case "ADD_EXPENSE":
			return [...state, action.expense]
		case "REMOVE_EXPENSE":
			return state.filter(({ id }) => id !== action.id);
		case "EDIT_EXPENSE":
			return state.map((expense) => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates
					}
				} else {
					return expense
				}
			})
		default:
			return state;
	}
};

const filtersReducerDefaultState = {
	text: "",
	sortBy: "date",
	startDate: undefined,
	endDate: undefined
}

// Filters reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case "SET_TEXT_FILTER":
			return {
				...state,
				text: action.text
			}
		case "SORT_BY_DATE":
			return {
				...state,
				sortBy: "date"
			}
		case "SORT_BY_AMOUNT":
			return {
				...state,
				sortBy: "amount"
			}
		case "SET_START_DATE":
			return {
				...state,
				startDate: action.startDate
			}
		case "SET_END_DATE":
			return {
				...state,
				endDate: action.endDate
			}
		default:
			return state
	}
}

// Get Visible Expenses
const getVisibleExpenses = (expenses, filters) => {
	const { text, sortBy, startDate, endDate } = filters;

	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	}).sort((a, b) => { // Sort the data after filter
		if (sortBy === "date") {
			return a.createdAt < b.createdAt ? 1 : -1;
		} else if (sortBy === "amount") {
			return a.amount < b.amount ? 1 : -1;
		}
	});
}

// Store Creation
const store = createStore(combineReducers({
	expenses: expensesReducer,
	filters: filtersReducer
}));

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: "Coffee", amount: 300, createdAt: -1000 }));
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(removeExpense());
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmout());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate()); // clear the date to undefined
// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate()); // clear the date to undefined

const demoState = {
	expenses: [{
		id: "ere",
		description: "January rent",
		note: "This was the final payment for that address",
		amount: 54500,
		createdAt: 0
	}],
	filters: {
		text: "rent",
		sortBy: "amount", // date or amount
		startDate: undefined,
		endDate: undefined
	}
}