<?php

$handler = mysqli_connect("127.0.0.1", "root", "", "account");

$old = mysqli_real_escape_string($handler, $_POST['oldpassword']);
$new = mysqli_real_escape_string($handler, $_POST['newpassword']);
$confirm = mysqli_real_escape_string($handler, $_POST['confirmpassword']);
$username = mysqli_real_escape_string($handler, $_POST['username']);

$query_old = sprintf("SELECT * FROM useraccount WHERE username='%s';", $username);
$result_set_identifier_old = mysqli_query($handler, $query_old);
$current_row_result_old = mysqli_fetch_assoc($result_set_identifier_old);

if ($old != $current_row_result_old['password']){
    echo "1";
    exit();
}else if (strlen($new) < 6 || strlen($new) > 20){
    echo "2";
    exit();
}else if ($old == $new){
    echo "3";
    exit();
}else if ($new != $confirm){
    echo "4";
    exit();
}else{
    $query_insertpass = sprintf("UPDATE useraccount SET password='%s' WHERE username='%s'", $confirm, $username);
    mysqli_query($handler, $query_insertpass);
}

?>