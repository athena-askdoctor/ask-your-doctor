<?php

require "config.php";

$data = json_decode(file_get_contents("php://input"), TRUE);

if ( (isset($data["username"]) && !empty($data["username"])) && (isset($data["name"]) && !empty($data["name"])) && (isset($data["password"]) && !empty($data["password"])) && (isset($data["isDoctor"]) && (!empty($data["isDoctor"]) || ($data["isDoctor"] == 0))) && (isset($data["location"]) && !empty($data["location"])) ) {
	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	if ( $mysqli->connect_errno ) {
		echo $mysqli->connect_error;
		exit();
	}

	// check unique username
	$statement = $mysqli->prepare("SELECT * FROM users WHERE username = ?");

	$statement->bind_param("s", $data["username"]);
	$executed = $statement->execute();
	if(!$executed) {
		echo $mysqli->error;
	}
	$statement->store_result();
	if($statement->num_rows != 0) {
		echo "Usernmae Exists!";
	} else {
		// hash password
		$password = hash("sha256", $data["password"]);
		$statement = $mysqli->prepare("INSERT INTO users(username, name, isDoctor, password, location) VALUES(?, ?, ?, ?, ?)");
		$statement->bind_param("ssiss", $data["username"], $data["name"], $data["isDoctor"], $password, $data["location"]);
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