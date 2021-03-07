<?php

require "config.php";

$data = json_decode(file_get_contents("php://input"), TRUE);

if( (isset($data["username"]) && !empty($data["username"])) && (isset($data["password"]) && !empty($data["password"])) ) {
	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	if ( $mysqli->connect_errno ) {
		echo $mysqli->connect_error;
		exit();
	}

	$password = hash("sha256", $data["password"]);
	$statement = $mysqli->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
	$statement->bind_param("ss", $data["username"], $password);
	$executed = $statement->execute();
	if(!$executed) {
		echo $mysqli->error;
		exit();
	}
	$result = $statement->get_result();
	if($result->num_rows > 0) {
		$user = $result->fetch_assoc();
		$results_array = array("userid"=>$user["userid"], "name"=>$user["name"], "username"=>$user["username"], "avatar"=>$user["avatar"], "isDoctor"=>$user["isDoctor"], "emergencycontact1"=>$user["emergencycontact1"], "emergencycontact2"=>$user["emergencycontact2"], "location"=>$user["location"]);
		echo json_encode($results_array);
	} else {
		$error = "Invalid username or password.";
	}

	$statement->close();

	$mysqli->close();


}

?>