<?php

$handler = mysqli_connect("127.0.0.1", "root", "", "account");

$email = mysqli_real_escape_string($handler, $_POST['email']);
$password = mysqli_real_escape_string($handler, $_POST['password']);

$query_email = sprintf("SELECT * FROM useraccount WHERE email='%s';", $email);
$result_set_identifier_email = mysqli_query($handler, $query_email);
$current_row_result_email = mysqli_fetch_assoc($result_set_identifier_email);

$reply = array();

if (!empty($current_row_result_email['email'])){
    $query_password = sprintf("SELECT password FROM useraccount WHERE email='%s';", $email);
    $result_set_identifier_password = mysqli_query($handler, $query_password);
    $current_row_result_password = mysqli_fetch_assoc($result_set_identifier_password);

    if ($current_row_result_password['password'] == $password){
        $query_email = sprintf("SELECT username FROM useraccount WHERE email='%s';", $email);
        $result_set_identifier_email = mysqli_query($handler, $query_email);
        $current_row_result_email = mysqli_fetch_assoc($result_set_identifier_email);
        array_push($reply,"1", $current_row_result_email['username']);
        echo json_encode($reply);
        exit();
    }else{
        array_push($reply,"2");
        echo json_encode($reply);
        exit();
    }

}else{
    array_push($reply,"3");
    echo json_encode($reply);
    exit();
}

?>



