<?php
include 'connect.php';
$count = $_POST['count'];
$seconds = $_POST['seconds'];
$name = $_POST['name'];
$state = $_POST['state'];
$date = date('y.m.d');

$sql = "INSERT INTO `players` (`name`, `score`, `date`, `time`, `state`) VALUES ('$name','$count','$date','$seconds', '$state')";
$conn->query($sql); 
