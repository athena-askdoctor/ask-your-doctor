//LogIn();

axios.post('../login.php', {
	username: encodeURIComponent("test2"),
	password: encodeURIComponent("0123456789")
})
.then(function (response) {
	console.log(response.data);
})
.catch(function (error) {
	console.log(error);
});

function isJson(json) {
	try {
		JSON.parse(json);
	} catch(e) {
		return false;
	}
	return true;
}

function LogIn() {
	let data = "username=" + encodeURIComponent("username") + "&password=" + encodeURIComponent(1234567890);
	CheckUser(data, function(results) {
		console.log(results);
		/* example output
		 * {"userid":1,"name":"name","username":"username","avatar":null,"isDoctor":1,"emergencycontact1":null,"emergencycontact2":null,"location":null}
		 */
		if (isJson(results)) {
			results = JSON.parse(results);
			console.log(results);
			/* example output:
			 * avatar: null
			 * emergencycontact1: null
			 * emergencycontact2: null
			 * isDoctor: 1
			 * location: null
			 * name: "name"
			 * userid: 1
			 * username: "username"
			 */
		}
	});
}

function CheckUser(postData, returnFunction) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "../login.php", true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function(){
		if (xhr.readyState == XMLHttpRequest.DONE) {
			if (xhr.status == 200) {
				returnFunction( xhr.responseText );
			} else {
				alert('AJAX Error.');
				console.log(xhr.status);
			}
		}
	}
	xhr.send(postData);
}
