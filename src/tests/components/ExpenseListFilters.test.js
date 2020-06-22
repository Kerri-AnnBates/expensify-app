import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();;
	setEndDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>
	);
});

test("should render ExpenseListFiltersCorrectly correctly", () => {
	expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFiltersCorrectly with alt data correctly", () => {
	wrapper.setProps({
		filters: altFilters
	});

	expect(wrapper).toMatchSnapshot();
});

// should handle text change
test("should handle text change", () => {
	const text = "new text";

	wrapper.find("input").simulate("change", {
		target: { value: text }
	});

	expect(setTextFilter).toHaveBeenLastCalledWith(text);
});

// should sort by date
test("should sort by date", () => {
	wrapper.find("select").simulate("change", {
		target: { value: "date" }
	});

	expect(sortByDate).toHaveBeenCalled();
});

// should sort by amount
test("should sort by amount", () => {
	wrapper.find("select").simulate("change", {
		target: { value: "amount" }
	});

	expect(sortByAmount).toHaveBeenCalled();
});

// should handle date changes
test("should handle date changes", () => {
	const startDate = moment(0);
	const endDate = moment(0).add(3, "days");

	wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate, endDate });

	expect(setStartDate).toHaveBeenLastCalledWith(startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// should handle date focus changes
test("should handle date focus changes", () => {
	wrapper.find("DateRangePicker").prop("onFocusChange")(true);

	expect(wrapper.state("calendarFocused")).toBe(true);
});