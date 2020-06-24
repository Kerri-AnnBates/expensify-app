import getExpenseTotal from "../../selectors/expense-total";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
	const result = getExpenseTotal([]);
	expect(result).toBe(0);
});

test("should correctly add up a single expense", () => {
	const result = getExpenseTotal([expenses[0]]);
	expect(result).toBe(195);
});

test("should correctly add up a multiple expenses", () => {
	const result = getExpenseTotal(expenses);
	expect(result).toBe(114195);
});