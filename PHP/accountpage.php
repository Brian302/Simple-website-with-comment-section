<?php

$handler = mysqli_connect("127.0.0.1", "root", "", "account");

$username = mysqli_real_escape_string($handler, $_POST["username"]);


$query = sprintf("SELECT * FROM useraccount WHERE username='%s';", $username);
$result_set_identifier = mysqli_query($handler, $query);
$current_row_result = mysqli_fetch_assoc($result_set_identifier);

$wanted = array('firstname', 'lastname', 'username', 'email');
$details = array();

foreach ($wanted as $value){
    array_push($details, $current_row_result[$value]);
}

// for ($i = 0; $i <= 4; $i++){
//     array_push($details, $current_row_result[$i]);
// }

$length = strlen($current_row_result['password']);
array_push($details, $length);
echo json_encode($details);
exit();

?>