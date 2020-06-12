import moment from "moment";
import selectExpenses from "../../selectors/expenses";

const expenses = [
	{
		id: "1",
		description: "Gum",
		note: "",
		amount: 195,
		createdAt: 0
	},
	{
		id: "2",
		description: "Rent",
		note: "",
		amount: 109500,
		createdAt: moment(0).subtract(4, "days").valueOf() // Go 4 days in past from 0 date.
	},
	{
		id: "3",
		description: "Credit Card",
		note: "",
		amount: 4500,
		createdAt: moment(0).add(4, "days").valueOf() // Go 4 days in the future.
	}
]

test("should filter by text value", () => {
	const filters = {
		text: "e",
		sortBy: "date",
		startDate: undefined,
		endDate: undefined
	}

	const results = selectExpenses(expenses, filters);
	expect(results).toEqual([expenses[2], expenses[1]]);
});

test("should filter by start date", () => {
	const filters = {
		text: "",
		sortBy: "date",
		startDate: moment(0),
		endDate: undefined
	}

	const results = selectExpenses(expenses, filters);
	expect(results).toEqual([expenses[2], expenses[0]]);
});

// should filter by end date
test("should filter by end date", () => {
	const filters = {
		text: "",
		sortBy: "date",
		startDate: undefined,
		endDate: moment(0).add(2, "days")
	}

	const results = selectExpenses(expenses, filters);
	expect(results).toEqual([expenses[0], expenses[1]]);
});

// should sort by date
test("should filter by date", () => {
	const filters = {
		text: "",
		sortBy: "date",
		startDate: undefined,
		endDate: undefined
	}

	const results = selectExpenses(expenses, filters);
	expect(results).toEqual([expenses[2], expenses[0], expenses[1]]);
});

// should filter by amount
test("should filter by amount", () => {
	const filters = {
		text: "",
		sortBy: "amount",
		startDate: undefined,
		endDate: undefined
	}

	const results = selectExpenses(expenses, filters);
	expect(results).toEqual([expenses[1], expenses[2], expenses[0]]);
});