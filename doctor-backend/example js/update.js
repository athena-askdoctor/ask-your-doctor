// return string "updated" on success

// empty emergency contact
axios.post('../updateUserInfo.php', {
	userid: 4,
	name: encodeURIComponent("Pikachu"),
	location: "United States",
	portfolio: "I am so powerful!",
	avatar: "https://assets.pokemon.com//assets/cms2/img/video-games/_tiles/pokemon-sword-shield/distributions/pikachu/inline/world.png",
	emergencycontact1: "",
	emergencycontact2: ""
})
.then(function (response) {
	console.log(response.data);
})
.catch(function (error) {
	console.log(error);
});

// // one empty emergency contact
// axios.post('../updateUserInfo.php', {
// 	userid: 4,
// 	name: encodeURIComponent("Pikachu"),
// 	location: "United States",
// 	portfolio: "I am so powerful!",
// 	avatar: "https://assets.pokemon.com//assets/cms2/img/video-games/_tiles/pokemon-sword-shield/distributions/pikachu/inline/world.png",
// 	emergencycontact2: {
// 		name: "Ash",
// 		phone: "123"
// 	},
// 	emergencycontact1: ""
// })
// .then(function (response) {
// 	console.log(response.data);
// })
// .catch(function (error) {
// 	console.log(error);
// });

// update password
// axios.post('../updateUserInfo.php', {
// 	userid: 4,
// 	oldpassword: "1234567890",
// 	newpassword: "0123456789"
// })
// .then(function (response) {
// 	console.log(response.data);
// })
// .catch(function (error) {
// 	console.log(error);
// });

