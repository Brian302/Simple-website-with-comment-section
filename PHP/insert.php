<?php

$handler = mysqli_connect("whjgpserver.tplinkdns.com", "lbhserver", "_9%JJ5D6Ti_asCD", "account");

$fname = mysqli_real_escape_string($handler, $_POST['firstname']);
$lname = mysqli_real_escape_string($handler, $_POST['lastname']);
$uname = mysqli_real_escape_string($handler, $_POST['username']);
$email = mysqli_real_escape_string($handler, $_POST['email']);
$spassword = mysqli_real_escape_string($handler, $_POST['signuppassword']);
$cpassword = mysqli_real_escape_string($handler, $_POST['confirmpassword']);

$query_email = sprintf("SELECT * FROM useraccount WHERE email='%s';", $email);
$result_set_identifier_email = mysqli_query($handler, $query_email);
$current_row_result_email = mysqli_fetch_assoc($result_set_identifier_email);

$query_username = sprintf("SELECT * FROM useraccount WHERE username='%s';", $uname);
$result_set_identifier_username = mysqli_query($handler, $query_username);
$current_row_result_username = mysqli_fetch_assoc($result_set_identifier_username);

$output = array();
$error = false;

if ($fname == null || $fname == ''){
    array_push($output, "1");
    $error = true;
}
if ($lname == null || $lname == ''){
    array_push($output, "2");
    $error = true;
}
if ($uname == null || $uname == ''){
    array_push($output, "3");
    $error = true;
}else if (strlen($uname) > 20){
    array_push($output, "4");
    $error = true;
}
if (!((str_contains($email,'@')) && ((str_contains($email,'.com')) || (str_contains($email,'.co')) || (str_contains($email,'.edu'))))){
    array_push($output, "5");
    $error = true;
}if ($spassword == null || $spassword == ''){
    array_push($output, "6");
    $error = true;
}else if (strlen($spassword) < 6 || strlen($spassword) > 20){
    array_push($output, "7");
    $error = true;
}else if ($cpassword != $spassword){
    array_push($output, "8");
    $error = true;
}
if ($error == true){
    if (!empty($current_row_result_email['email'])){
        array_push($output, "9");

    }else if (!empty($current_row_result_username['username'])){
        array_push($output, "10");
    }
}else{
    $query = sprintf("INSERT INTO useraccount (firstname, lastname, username, email, password) VALUES ('%s', '%s', '%s', '%s', '%s')", $fname, $lname, $uname, $email, $cpassword);
    mysqli_query($handler, $query);
    array_push($output, "0");
}

echo json_encode($output);

?>