<?php

require "config.php";

if ( (isset($_POST["username"]) && !empty($_POST["username"])) && (isset($_POST["name"]) && !empty($_POST["name"])) && (isset($_POST["password"]) && !empty($_POST["password"])) && (isset($_POST["isDoctor"]) && !empty($_POST["isDoctor"])) ) {
	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	if ( $mysqli->connect_errno ) {
		echo $mysqli->connect_error;
		exit();
	}

	// check unique username
	$statement = $mysqli->prepare("SELECT * FROM users WHERE username = ?");

	$statement->bind_param("s", $_POST["username"]);
	$executed = $statement->execute();
	if(!$executed) {
		echo $mysqli->error;
	}
	$statement->store_result();
	if($statement->num_rows != 0) {
		echo "Usernmae Exists!";
	} else {
		// hash password
		$password = hash("sha256", $_POST["password"]);
		$statement = $mysqli->prepare("INSERT INTO users(username, name, isDoctor, password) VALUES(?, ?, ?, ?)");
		$statement->bind_param("ssis", $_POST["username"], $_POST["name"], $_POST["isDoctor"], $password);
		$executed = $statement->execute();
		if(!$executed) {
			echo $mysqli->error;
		}
		if($statement->affected_rows == 1) {
			echo "success";
		} else {
			echo "false";
		}
	}

	$statement->close();

	$mysqli->close();

} else {
	echo "Error";
	exit();
}

?>