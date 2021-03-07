//register();

function register() {
	let data = "username=" + encodeURIComponent("username") + "&name=" + encodeURIComponent("name") + "&isDoctor=" + encodeURIComponent(1) + "&password=" + encodeURIComponent(1234567890);
	createUser(data, function(results) {
		if (results == "success") {
			alert("success");
		} else {
			console.log(results);
		}
	});
}

function createUser(postData, returnFunction) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "../signup.php", true);
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
