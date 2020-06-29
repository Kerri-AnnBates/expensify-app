import * as firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCiq_P4lU8zPhbuf30GhotcXrWSjleFspk",
	authDomain: "expensify-app-af7b3.firebaseapp.com",
	databaseURL: "https://expensify-app-af7b3.firebaseio.com",
	projectId: "expensify-app-af7b3",
	storageBucket: "expensify-app-af7b3.appspot.com",
	messagingSenderId: "522969163719",
	appId: "1:522969163719:web:39e2cec81702df76aa5be2"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

// database.ref("expenses").on("value", (snapshot) => {
// 	const expenses = [];
// 	snapshot.forEach((childsnapshot) => {
// 		expenses.push({
// 			id: childsnapshot.key,
// 			...childsnapshot.val()
// 		})
// 	});
// 	console.log(expenses);
// });

// database.ref("expenses/-MAhAQ9QyG0ZA1eudvul").update({
// 	description: "Groceries"
// });

// database.ref("expenses").push({
// 	description: "Rent",
// 	note: "",
// 	createAt: 230,
// 	amount: 11390
// });
// database.ref("expenses").push({
// 	description: "Gas",
// 	note: "",
// 	createAt: 23034,
// 	amount: 3600
// });
// database.ref("expenses").push({
// 	description: "Coffee",
// 	note: "",
// 	createAt: 243,
// 	amount: 23
// });