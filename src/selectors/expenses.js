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

export default getVisibleExpenses;