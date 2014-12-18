<?php
session_start();
echo '	<!-- Header Table -->
		<div>
			<table class="header" cellspacing="0" cellpadding="0" border="0">
				<tbody>
					<tr>
						<td>
							<div class="logo"><img src="images/Logo.gif" /></div>
						</td>
						<td valign="top">			
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<br/>
		<!-- Body Header-->
		<div>
			<table>
				<tr>
					<td width="120">
					</td>
					<td width="784">
						<h1 align="center"> 
							<span class="title_manage">
									'.$_SESSION['oc_header'].'
							</span>
						</h1>
					</td>
					<td width="120">
					</td>
				</tr>
			</table>

		</div>';
?>