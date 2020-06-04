/* OBJECT DESTRUCTURING */
const person = {
	name: "Kerri-Ann",
	age: 31,
	location: {
		city: "orlando",
		temp: 82
	}
}

// With a default value
const { name = "Anonymous", age } = person;

console.log(`${name} is ${age}.`);

// renaming temp to temperature
const { city, temp: temperature } = person.location;

if (city && temperature) {
	console.log(`It is ${temperature} degrees in ${city}`);
}

// CHALLENGE
const book = {
	title: "Ego is the enemy",
	author: "Ryan Holiday",
	publisher: {
		name: "Penguin"
	}
}

const { name: publisherName = "Self-published" } = book.publisher;

console.log(publisherName);


/* ARRAY DESTRUCTURING */
const address = [
	"1299 south juniper street", "Philadelphia", "Pennsylvania", "19147"
]

const [, arrCity, state = "Florida"] = address;

console.log(`You are in ${arrCity}, ${state}`);

// CHALLENGE
const item = ["coffee (Hot)", "$2.00", "$2.50", "$2.75"];

const [coffee, , mediumPrice] = item;

console.log(`A medium hot ${coffee} costs ${mediumPrice}`);
