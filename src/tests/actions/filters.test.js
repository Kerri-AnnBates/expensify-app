import moment from "moment";
import { setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmout } from "../../actions/filters";

test("should generate set start date action object", () => {
	const action = setStartDate(moment(0));
	expect(action).toEqual({
		type: "SET_START_DATE",
		startDate: moment(0)
	});
});

test("should generate set end date action object", () => {
	const action = setEndDate(moment(0));
	expect(action).toEqual({
		type: "SET_END_DATE",
		endDate: moment(0)
	});
});

test("should generate set text filter", () => {
	const action = setTextFilter("rent");
	expect(action).toEqual({
		type: "SET_TEXT_FILTER",
		text: "rent"
	});
});

test("should generate set text filter with default value", () => {
	const action = setTextFilter();
	expect(action).toEqual({
		type: "SET_TEXT_FILTER",
		text: ""
	});
});

test("should generate date action object setting sort by date", () => {
	const action = sortByDate();
	expect(action).toEqual({
		type: "SORT_BY_DATE"
	});
});

test("should generate action object to set sort type by amount", () => {
	const action = sortByAmout();
	expect(action).toEqual({
		type: "SORT_BY_AMOUNT"
	});
});

