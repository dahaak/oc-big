<?php 
	// Use $_SESSION variables
	session_start();
	// Include settings file
	include 'bin/settings.php';
	if ($_GET['token'] != $_SESSION['oc_token']) {
		// This page can only be addressed with the right token
		include('bin/404.php');
		die();
	}
	// Get file information from the URL
	$savePath = $_GET['savePath'];


if(!$savePath){ 
	// File does not exist	
    die('file not found');
} else {
	if (strpos($savePath, $_SESSION['oc_uploadDirLinux']) === false) {
		// Access denied due to path
		//include('bin/404.php');
		die('wrong savePath '.$_SESSION['oc_uploadDirLinux'].' '.$savePath);
	}
	if (!file_exists($savePath)) {
		die('wrong request');
	}
	$fileSplit = explode("/", $savePath);
	$file = $fileSplit[5];
	// Prepare download
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-Disposition: attachment; filename=$file");
    //header("Content-Type: application/zip");
    //header("Content-Transfer-Encoding: binary");
    // read the file from disk
    readfile($savePath);
}
?>