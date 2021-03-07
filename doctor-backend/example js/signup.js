// //register();
axios.post('../signup.php', {
	username: encodeURIComponent("test2"),
	name: encodeURIComponent("whoever"),
	isDoctor: 0,
	password: encodeURIComponent(1234567890),
	location: "Africa"
})
.then(function (response) {
	console.log(response.data);
})
.catch(function (error) {
	console.log(error);
});


// function register() {
// 	let data = "username=" + encodeURIComponent("username") + "&name=" + encodeURIComponent("name") + "&isDoctor=" + encodeURIComponent(1) + "&password=" + encodeURIComponent(1234567890);
// 	createUser(data, function(results) {
// 		if (results == "success") {
// 			alert("success");
// 		} else {
// 			console.log(results);
// 		}
// 	});
// }

// function createUser(postData, returnFunction) {
// 	axios.post('/user', {
// 		firstName: 'Fred',
// 		lastName: 'Flintstone'
// 	})
// 	.then(function (response) {
// 		console.log(response);
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	});
// 	/*let xhr = new XMLHttpRequest();
// 	xhr.open("POST", "../signup.php", true);
// 	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState == XMLHttpRequest.DONE) {
// 			if (xhr.status == 200) {
// 				returnFunction( xhr.responseText );
// 			} else {
// 				alert('AJAX Error.');
// 				console.log(xhr.status);
// 			}
// 		}
// 	}
// 	xhr.send(postData);*/
// }
