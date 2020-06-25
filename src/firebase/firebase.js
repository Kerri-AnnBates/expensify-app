import * as firebase from "firebase";



firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database.ref().on("value", (snapshot) => {
	const data = snapshot.val();
	console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`);
});

setTimeout(() => {
	database.ref().update({
		"job/company": "Google"
	});
}, 2000);

// database.ref().set({
// 	name: "Kerri-Ann",
// 	age: 31,
// 	stressLevel: 6,
// 	job: {
// 		title: "Software Developer",
// 		"company": "Google"
// 	},
// 	location: {
// 		city: "Orlando",
// 		state: "Florida"
// 	}
// }).then(() => {
// 	console.log("Data was saved");
// }).catch((error) => {
// 	console.log("This failed:", error);
// });

// database.ref().update({
// 	stressLevel: 9,
// 	"job/company": "Amazon",
// 	"location/city": "Seattle"
// });