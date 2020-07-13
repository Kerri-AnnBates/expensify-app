import authReducer from "../../reducers/auth";

test("Should set uid for login", () => {
	const uid = "123abc";
	const action = {
		type: "LOGIN",
		uid
	}
	const state = authReducer({}, action);

	expect(state).toEqual({
		uid
	});
});

test("Should clear uid for logout", () => {
	const action = { type: "LOGOUT" }
	const state = authReducer({ uid: "anything" }, action);

	expect(state).toEqual({});
});