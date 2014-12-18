<?php
echo 		   '<tr>
					<td width="120">
					</td>
					<td width="784">
						<h3>Zip and Upload</h3>
						Here you can acclerate the upload process by zipping your files before transfer. For this, the files are temporally stored in your local memory. If the file size exceeds your free memory space "Zip and Upload" will not work. Please use normal Upload instead.
						<p></p>

									<select style="visibility:hidden;" id="creation-method-input">
										<option value="Blob">RAM</option>
										<option value="File">HDD</option>
									</select>
									<span class="btn btn-success button_oc fileinput-button">
										<i class="icon-plus icon-white"></i>
										<span style="vertical-align:middle;margin-left:6px;">Select files...</span>
										<input type="file" id="file-input" multiple/>
									</span>
									<ul id="file-list"></ul>

					</td>
					<td width="120">
					</td>
				</tr>'

?>