<?php
session_start();
echo '	<div>
			<table>
				<tr>
					<td width="120">
					</td>
					<td width="784">
						<h3>Upload</h3>
						<br/>
						<!-- The file upload form used as target for the file upload widget -->
						<form id="fileupload" action="//jquery-file-upload.appspot.com/" method="post" enctype="multipart/form-data">
							Here you can upload multiple files without file size limits. The file names are annotated with the Study ID and Subject ID. 
							<p/>
							<!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
							<div class="row fileupload-buttonbar">
							   <div class="span7">
									<!-- The fileinput-button span is used to style the file input field as button -->
									<span class="btn btn-success button_oc fileinput-button">
										<i class="icon-plus icon-white"></i>
										<span style="vertical-align:middle;margin-left:8px;">Select files...</span>
										<input type="file" name="files[]" multiple />										
									</span>
									<button type="button" class="btn btn-danger button_oc delete">
										<i class="icon-trash icon-white"></i>
										<span style="margin-right:18px;">Delete</span>
									</button>
									<input type="checkbox" class="toggle" /> All
								</div>
								<!-- The global progress information -->
								<div class="span5 fileupload-progress fade">
									<!-- The global progress bar -->
									<div class="progress progress-success progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
										<div class="bar" style="width:0%;"></div>
									</div>
									<!-- The extended global progress information -->
									<div class="progress-extended">&nbsp;</div>
								</div>
							</div>
							<!-- The loading indicator is shown during file processing -->
							<div class="fileupload-loading"></div>
							<br/>
							<!-- The table listing the files available for upload/download -->
							<!-- IMI: Target added, to make all files open in new window/tabs when clicked upon -->
							<table role="presentation" class="table table-striped"><tbody class="files" data-toggle="modal-gallery" data-target="#modal-gallery" target="_blank"></tbody></table>
						</form>
					</td>
					<td width="120">
					</td>
				</tr>';
				// Check settings
				if ($_SESSION['oc_zip'] == 1) {
					// Include zip functionality
					include 'bin/zip.php';
				}
echo '			<tr>
					<td width="120">
					</td>
					<td width="784">
						<h3>Finish and Fill eCRF</h3>
						Click the "Finish Upload" button after all files are transferred. Window is closed, history deleted and your uploaded files are entered in the eCRF and connected with study, event and subject. 
						<p></p>
						<div class="row fileupload-buttonbar">
							<div class="span7">
								<button type="button" onclick="submitVal()" class="btn button_oc" background-color="#789ecs">
									<i class="icon-plus icon-white"></i>
									<span style="margin-right:18px;vertical-align:middle;">Finish upload</span>
								</button>
							</div>
						</div>
					</td>
					<td width="120">
					</td>
				</tr>
			</table>
		</div>';
?>