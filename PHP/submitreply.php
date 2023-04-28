<?php

$handler = mysqli_connect("127.0.0.1", "root", "", "account");

$reply = mysqli_real_escape_string($handler, $_POST['reply']);
$name = mysqli_real_escape_string($handler, $_POST['name']);
$pid = mysqli_real_escape_string($handler, $_POST['pid']);
$layer = mysqli_real_escape_string($handler, $_POST['layer']);

$name_query = "SELECT * FROM useraccount WHERE username = '$name'";
$name_result = mysqli_query($handler, $name_query);
$name_first_row = mysqli_fetch_assoc($name_result);

$output = array();
$error = false;

if (empty($name_first_row['username'])){
    exit("Who are you?");
}
if ($reply == '' || $reply == null){
    array_push($output,"1");
    $error = true;
}else if (strlen($reply) > 512){
    array_push($output,"2");
    $error = true;
}
if ($layer != 1 && $layer != 2){
    exit("Who are you?");
}
if ($error == false){
    $query = "INSERT INTO comments (name, comment, layer) VALUES ('$name', '$reply', '$layer')";
    mysqli_query($handler, $query);
    array_push($output,"3");

    $replier_query = "SELECT * FROM comments ORDER BY commentid DESC";
    $replier_result = mysqli_query($handler, $replier_query);
    $replier_first_row = mysqli_fetch_assoc($replier_result);

    $commenter_query = "SELECT * FROM comments WHERE commentid='$pid'";
    $commenter_result = mysqli_query($handler, $commenter_query);
    $commenter_first_row = mysqli_fetch_assoc($commenter_result);

    if (!(empty($commenter_first_row['replies']))){
        $prefinal = $commenter_first_row['replies'];
        $final = $prefinal . ',' . $replier_first_row['commentid'];
        $update_query = "UPDATE comments SET replies='$final' WHERE commentid='$pid'";
        mysqli_query($handler, $update_query);
    }else{
        $final = $replier_first_row['commentid'];
        $update_query = "UPDATE comments SET replies='$final' WHERE commentid='$pid'";
        mysqli_query($handler, $update_query);
    }
    
}

echo json_encode($output);

?>