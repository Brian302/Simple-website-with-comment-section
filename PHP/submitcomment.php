<?php

$handler = mysqli_connect("127.0.0.1", "root", "", "account");

$commenttitle = mysqli_real_escape_string($handler, $_POST['commenttitle']);
$comment = mysqli_real_escape_string($handler, $_POST['comment']);
$name = mysqli_real_escape_string($handler, $_POST['name']);
$layer = mysqli_real_escape_string($handler, $_POST['layer']);

$name_query = "SELECT * FROM useraccount WHERE username = '$name'";
$name_result = mysqli_query($handler, $name_query);
$name_first_row = mysqli_fetch_assoc($name_result);

$output = array();
$error = false;

if (empty($name_first_row['username'])){
    exit("Who are you?");
}
if ($commenttitle == '' || $commenttitle == null){
    array_push($output,"1");
    $error = true;
}else if (strlen($commenttitle) > 64){
    array_push($output,"2");
    $error = true;
}
if ($comment == '' || $comment == null){
    array_push($output,"3");
    $error = true;
}else if (strlen($comment) > 512){
    array_push($output,"4");
    $error = true;   
}
if ($layer != 1 && $layer != 2){
    exit("Who are you?");
}
if ($error == false){
    $query = "INSERT INTO comments (name, title, comment, layer) VALUES ('$name', '$commenttitle', '$comment', '$layer')";
    mysqli_query($handler, $query);
    array_push($output,"5");
}

echo json_encode($output);

?>