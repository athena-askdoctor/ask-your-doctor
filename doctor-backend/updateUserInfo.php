<?php

require "config.php";

$data = json_decode(file_get_contents("php://input"), TRUE);

if ( isset($data["userid"]) && !empty($data["userid"]) ) {
	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	if ( $mysqli->connect_errno ) {
		echo $mysqli->connect_error;
		exit();
	}
	if ( (isset($data["newpassword"]) && !empty($data["newpassword"])) && (isset($data["oldpassword"]) && !empty($data["oldpassword"])) ) {
		// check if old password is correct
		$oldpassword = hash("sha256", $data["oldpassword"]);
		$statement = $mysqli->prepare("SELECT * FROM users WHERE userid = ? AND password = ?");
		$statement->bind_param("is", $data["userid"], $oldpassword);
		$executed = $statement->execute();
		if(!$executed) {
			echo $mysqli->error;
		}
		$statement->store_result();
		if($statement->num_rows != 1) {
			echo "Incorrect Old Password";
		} else {
			$newpassword = hash("sha256", $data["newpassword"]);
			$statement = $mysqli->prepare("UPDATE users SET password = ? WHERE userid = ?");
			$statement->bind_param("si", $newpassword, $data["userid"]);
			$executed = $statement->execute();
			if(!$executed) {
				echo $mysqli->error;
			}
			if($statement->affected_rows <= 1) {
				echo "updated";
			}
		}
	} else if ( (isset($data["name"]) && !empty($data["name"])) && (isset($data["location"]) && !empty($data["location"])) && isset($data["portfolio"]) && (isset($data["avatar"]) && !empty($data["avatar"])) && isset($data["emergencycontact1"]) && isset($data["emergencycontact2"]) ) {
		$emergencycontact1 = json_encode($data["emergencycontact1"]);
		$emergencycontact2 = json_encode($data["emergencycontact2"]);
		if (empty($data["emergencycontact1"]))
		{
			$emergencycontact1 = null;
		}
		if (empty($data["emergencycontact2"]))
		{
			$emergencycontact2 = null;
		}
		$statement = $mysqli->prepare("UPDATE users SET name = ?, location = ?, portfolio = ?, avatar = ?, emergencycontact1 = ?, emergencycontact2 = ? WHERE userid = ?");
		$statement->bind_param("ssssssi", $data["name"], $data["location"], $data["portfolio"], $data["avatar"], $emergencycontact1, $emergencycontact2, $data["userid"]);
		$executed = $statement->execute();
		if(!$executed) {
			echo $mysqli->error;
		}
		if($statement->affected_rows <= 1) {
			echo "updated";
		}
	}
} else {
	echo "No user id provided!";
}

?>