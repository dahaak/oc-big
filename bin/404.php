<?php
session_start();
$_SESSION['oc_header'] = '404';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

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
	</head>
	<body class="main_BG" topmargin="0" leftmargin="0" marginwidth="0" marginheight="0">
		<!-- Header Table -->
		<?php include 'bin/header.php'; ?>
		<!-- Text Body -->
		<div>
			<table>
				<tr>
					<td width="120">
					</td>
					<td width="784">
						<h3>You are not allowed to access this site.</h3>
						<br/>
						Text here.
					</td>
					<td width="120">
					</td>
				</tr>
			</table>
		</div>
		<!-- Footer --> 
		<?php include 'bin/footer.php'; ?>
	</body>
</html>
