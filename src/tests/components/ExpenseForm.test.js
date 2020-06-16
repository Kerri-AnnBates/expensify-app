import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("should render expense form correctly", () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test("should render expense form correctly with data", () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
	expect(wrapper).toMatchSnapshot();
});

test("should render error on invalid form submittion", () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();

	wrapper.find("form").simulate("submit", {
		preventDefault: () => { }
	});

	expect(wrapper.state("error").length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
	const value = "New description";
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find("input").at(0).simulate("change", {
		target: { value }
	});

	expect(wrapper.state("description")).toBe(value);
});

test("should set note text area on change", () => {
	const value = "New note";
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find("textarea").simulate("change", {
		target: { value }
	});

	expect(wrapper.state("note")).toBe(value);
});

test("should set amount if valid input", () => {
	const value = "23.50";
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find("input").at(1).simulate("change", {
		target: { value }
	});

	expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount if invalid input", () => {
	const value = "12.222";
	const wrapper = shallow(<ExpenseForm />);

	wrapper.find("input").at(1).simulate("change", {
		target: { value }
	});

	expect(wrapper.state("amount")).toBe("");
});