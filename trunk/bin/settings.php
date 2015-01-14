<?php
/*
 * This file is used for general settings which are stored for each user session
 */


/*
 * Include machine settings in the global array $_SESSION
 */
// Path to folder in Apache
$_SESSION['oc_apache'] = '//var/www/basic/';
// The folder to store the data permanently
$_SESSION['oc_uploadDirLinux'] = '//mnt/big-data/openclinica/boostfund/';
// Title in index.php 
$_SESSION['oc_header'] = 'OC-Big';

/*
 * To enable functions set 1, else use 0
 */ 
// Add zipping to upload options => show Zip and Upload section
$_SESSION['oc_zip'] = 0;
// Set security token => only allow upload with this token in URL
$_SESSION['oc_token'] = '0eaa542f1661be753e3a2ca698b517f7';

/*
 * Add URL variables to the global array $_SESSION, the if clause excludes these calls on download.php
 */
 if(isset($_GET['studyName'])) {
	$_SESSION['oc_studyName'] = $_GET['studyName'];
}
 if(isset($_GET['visit'])) {
	$_SESSION['oc_visit'] = $_GET['visit'];
}
 if(isset($_GET['id'])) {
	$_SESSION['oc_id'] = $_GET['id'];
}
 if(isset($_GET['oc_field'])) {
	$_SESSION['oc_field'] = $_GET['field'];
}
 if(isset($_GET['oc_zip'])) {
	if ($_SESSION['oc_zip'] != 1) {
		$_SESSION['oc_fileType'] = $_GET['fileType'];
	} else {
		// Add blob to list of allowed file types
		$_SESSION['oc_fileType'] = $_GET['fileType'].',blob';
	}
}
 if(isset($_GET['oc_allowedNr'])) {
	$_SESSION['oc_allowedNr'] = $_GET['allowedNr'];
}
?>