const getExpenseTotal = (expenses) => {
	return (expenses.length !== 0) ?
		expenses.reduce((acc, currVal) => acc + currVal.amount, 0) :
		0;
}

export default getExpenseTotal;