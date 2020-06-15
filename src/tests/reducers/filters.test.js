import moment from "moment";
import filterReducer from "../../reducers/filters";

test("should setup default filter values", () => {
	const state = filterReducer(undefined, "@@INIT");

	expect(state).toEqual({
		text: "",
		sortBy: "date",
		startDate: moment().startOf("month"),
		endDate: moment().endOf("month")
	});
});

test("should set sortBy to amount", () => {
	const state = filterReducer(undefined, { type: "SORT_BY_AMOUNT" });

	expect(state).toEqual({
		text: "",
		sortBy: "amount",
		startDate: moment().startOf("month"),
		endDate: moment().endOf("month")
	});
});

test("should set sortBy to date", () => {

	const currentState = {
		text: "",
		sortBy: "amount",
		startDate: undefined,
		endDate: undefined
	}

	const action = { type: "SORT_BY_DATE" }
	const state = filterReducer(currentState, action);
	expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
	const state = filterReducer(undefined, { type: "SET_TEXT_FILTER", text: "something new" });
	expect(state.text).toBe("something new");
});

test("should set startDate", () => {
	const state = filterReducer(undefined, { type: "SET_START_DATE", startDate: moment(0).add(2, "days") });
	expect(state.startDate).toEqual(moment(0).add(2, "days"));
});

test("should set endDate", () => {
	const state = filterReducer(undefined, { type: "SET_END_DATE", endDate: moment(0).add(2, "days") });
	expect(state.endDate).toEqual(moment(0).add(2, "days"));
})