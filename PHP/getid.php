<?php

$handler = mysqli_connect("127.0.0.1", "root", "", "account");

$name = mysqli_real_escape_string($handler, $_POST['name']);

$query = "SELECT * FROM useraccount WHERE username='$name'";
$result = mysqli_query($handler, $query);
$row = mysqli_fetch_assoc($result);

echo $row['id'];
?>