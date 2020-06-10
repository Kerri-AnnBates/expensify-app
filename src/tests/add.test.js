const add = (a, b) => a + b;
// const add = (a, b) => a + b + 1;

const generateGreeting = (name = "Anonymous") => {
	return `Hello, ${name}`;
}

test("should add 2 numbers", () => {
	const result = add(3, 4);

	expect(result).toBe(7);
});

test("Should generate a greeting", () => {
	const name = "Kerri-Ann";
	const result = generateGreeting(name);

	expect(result).toBe("Hello, Kerri-Ann");
});

test("Should generate greeting for no name", () => {
	const result = generateGreeting();
	expect(result).toBe("Hello, Anonymous");
});
