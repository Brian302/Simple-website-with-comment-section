<?php

$servername = "databases.000webhost.com";                                                  
$username = "id19182940_root";
$password = "databaseGG123!";
$handler = mysqli_connect($servername, $username, $password);

// if (!$handler) {
//     die("Connection failed: " . mysqli_connect_error());
// } else {
//     echo "Connected successfully";
// }

// mysqli_query($handler, "CREATE DATABASE Account");                          Created a database

// $handler = mysqli_connect("127.0.0.1", "root", "", "Account");              Created a table for users within database

$the_query = "CREATE TABLE useraccount(
    id INT(6) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(32) NOT NULL,
    password VARCHAR(20) NOT NULL
)";

mysqli_query($handler, $the_query);

// $handler = mysqli_connect("127.0.0.1", "root", "", "account");              Created a table for comments within database

$comment_query = "CREATE TABLE comments(
    commentid INT(6) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    title VARCHAR(64),
    comment TEXT NOT NULL,
    replies TEXT,
    likes TEXT,
    dislikes TEXT,
    layer INT(1) NOT NULL
)";

mysqli_query($handler, $comment_query);

?>