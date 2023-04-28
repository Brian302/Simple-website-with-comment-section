<?php

$handler = mysqli_connect("127.0.0.1", "root", "", "account");

$query = mysqli_query($handler, "SELECT * FROM comments ORDER BY layer, commentid DESC");
$rows = array();
while($r = mysqli_fetch_assoc($query)) {
    $rows[] = $r;
}
echo json_encode($rows);

?>