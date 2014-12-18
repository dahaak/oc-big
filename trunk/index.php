<?php 
	// Use $_SESSION variables
	session_start();
	// Include settings file
	include 'bin/settings.php';
	if ($_GET['token'] != $_SESSION['oc_token']) {
		include('bin/404.php');
		die();
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--
OC-Big Data
 
Index HTML File 
 
Copyright 2013, Daniel Haak, Johan Gehlen, Praveen Sripad, Thomas M. Deserno. Departement of Medical Informatics. RWTH Aachen

Licensed under the BSD-2-Clauses license:
http://opensource.org/licenses/BSD-2-Clause

Based on JQuery File Upload Demo 
http://blueimp.github.io/jQuery-File-Upload/
Thanks to Sebastian Tschan
-->
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width" />
		<meta http-equiv="X-UA-Compatible" content="IE=8" />
		<title>OC-Big Data</title>

		<!-- Include page styling -->
			<!-- Include OpenClinica styles -->
			<link type="text/css" href="css/styles.css" rel="stylesheet" />
			<link type="text/css" href="css/skins/aqua/theme.css" rel="stylesheet" media="all" title="Aqua" />
			<!-- Bootstrap CSS toolkit styles, this file was cropped to use the OC style -->
			<link rel="stylesheet" href="css/bootstrap.min.css" />
			<!-- Bootstrap styles for responsive web site layout, supporting different screen sizes -->
			<link rel="stylesheet" href="css/bootstrap-responsive.css" />
			<!-- Bootstrap Image Gallery styles -->
			<link rel="stylesheet" href="css/bootstrap-image-gallery.css" />
			<!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
			<link rel="stylesheet" href="css/jquery.fileupload-ui.css" />
			<!-- CSS adjustments for browsers with JavaScript disabled -->
			<noscript>
				<link rel="stylesheet" href="css/jquery.fileupload-ui-noscript.css" />
			</noscript>
			<!-- Generic page styles -->
			<!--<link rel="stylesheet" href="css/style.css">-->
				
		<!-- Script -->
			<!-- jQuery -->
			<script type="text/javascript" src="js/jquery_1_9_1.js"></script>
			<!-- Bug reports -->
			<!--  <script type="text/javascript" src="oc_bugreport.js"></script> -->
			<!-- Zip scripts -->
			<script type="text/javascript" src="js/zip.js"></script>
			<script type="text/javascript" src="js/zip_controller.js"></script>
			<!-- Write filename back to OpenClinica -->
			<script type="text/javascript" src="js/oc_submit.js"></script>
			

		<!-- jQuery-File-Upload -->
			<!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->
			<script type="text/javascript" src="js/vendor/jquery.ui.widget.js"></script>
			<!-- The Templates plug-in is included to render the upload/download listings -->
			<script type="text/javascript" src="js/tmpl.js"></script>
			<!-- The Load Image plug-in is included for the preview images and image resizing functionality -->
			<script type="text/javascript" src="js/load-image.js"></script>
			<!-- The Canvas to Blob plug-in is included for image resizing functionality -->
			<script type="text/javascript" src="js/canvas-to-blob.js"></script>
			<!-- Bootstrap JS and Bootstrap Image Gallery are not required, but included for the demo -->
			<script type="text/javascript" src="js/bootstrap.js"></script>
			<script type="text/javascript" src="js/bootstrap-image-gallery.js"></script>
			<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
			<script type="text/javascript" src="js/jquery.iframe-transport.js"></script>
			<!-- The basic File Upload plug-in -->
			<script type="text/javascript" src="js/jquery.fileupload.js"></script>
			<!-- The File Upload file processing plug-in -->
			<script type="text/javascript" src="js/jquery.fileupload-fp.js"></script>
			<!-- The File Upload user interface plug-in -->
			<script type="text/javascript" src="js/jquery.fileupload-ui.js"></script>
			<!-- The main application script -->
			<script type="text/javascript" src="js/file_upload_controller.js"></script>

		<!-- Templates -->
			<!-- The template to display files available for upload -->
			<?php include 'bin/template_upload.php'; ?>
			<!-- The template to display files available for download -->
			<?php include 'bin/template_download.php'; ?>
	</head>
	<body class="main_BG" topmargin="0" leftmargin="0" marginwidth="0" marginheight="0">
		<!-- Header Table -->
		<?php include 'bin/header.php'; ?>
		<!-- Text Body -->
		<?php include 'bin/body.php'; ?>
		<!-- Footer --> 
		<?php include 'bin/footer.php'; ?>
	</body>
</html>