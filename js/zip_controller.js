/*
 * OC-Big Data
 * 
 * Zip functionality script
 * 
 * Copyright 2013, Daniel Haak, Johan Gehlen, Praveen Sripad, Thomas M. Deserno. Departement of Medical Informatics. RWTH Aachen
 *
 * Licensed under the BSD-2-Clauses license:
 * http://opensource.org/licenses/BSD-2-Clause
 *
 * Based on zip.js demo page 
 * http://gildas-lormeau.github.io/zip.js/
 * Thanks to Gildas Lormeau
 */

(window.onload=function(obj) {

	var requestFileSystem = obj.webkitRequestFileSystem || obj.mozRequestFileSystem || obj.requestFileSystem;

	function onerror(message) {
		alert(message);
	}

	function createTempFile(callback) {
		var tmpFilename = "tmp.zip";
		requestFileSystem(TEMPORARY, 4 * 1024 * 1024 * 1024, function(filesystem) {
			function create() {
				filesystem.root.getFile(tmpFilename, {
					create : true
				}, function(zipFile) {
					callback(zipFile);
				});
			}

			filesystem.root.getFile(tmpFilename, null, function(entry) {
				entry.remove(create, create);
			}, create);
		});
	}

	var model = (function() {
		var zipFileEntry, zipWriter, writer, creationMethod, URL = obj.webkitURL || obj.mozURL || obj.URL;

		return {
			setCreationMethod : function(method) {
				creationMethod = method;
			},
			addFiles : function addFiles(files, oninit, onadd, onprogress, onend) {
				var addIndex = 0;

				function nextFile() {
					var file = files[addIndex];
					onadd(file);
					zipWriter.add(file.name, new zip.BlobReader(file), function() {
						addIndex++;
						if (addIndex < files.length)
							nextFile();
						else
							onend();
					}, onprogress);
				}

				function createZipWriter() {
					zip.createWriter(writer, function(writer) {
						zipWriter = writer;
						oninit();
						nextFile();
					}, onerror);
				}

				if (zipWriter)
					nextFile();
				else if (creationMethod == "Blob") {
					writer = new zip.BlobWriter();
					createZipWriter();
				} else {
					createTempFile(function(fileEntry) {
						zipFileEntry = fileEntry;
						writer = new zip.FileWriter(zipFileEntry);
						createZipWriter();
					});
				}
			},
			getBlobURL : function(callback) {
				zipWriter.close(function(blob) {
					var blobURL = creationMethod == "Blob" ? URL.createObjectURL(blob) : zipFileEntry.toURL();
					callback(blobURL);
					zipWriter = null;
				});
			},
			getBlob : function(callback) {
				zipWriter.close(callback);
			}
		};
	})();

	(function() {
		var filename = "Transfer.zip";
		var fileInput = document.getElementById("file-input");
		var zipProgress = document.createElement("progress");
		var fileList = document.getElementById("file-list");
		var filenameInput = document.getElementById("filename-input");
		var creationMethodInput = document.getElementById("creation-method-input");
		if (creationMethodInput != null){
		if (typeof requestFileSystem == "undefined")
			creationMethodInput.options.length = 1;
		model.setCreationMethod(creationMethodInput.value);
		}
		if(fileInput != null){
		fileInput.addEventListener('change', function() {
			fileInput.disabled = true;
			creationMethodInput.disabled = true;
			model.addFiles(fileInput.files, function() {
			}, function(file) {
				var li = document.createElement("li");
				zipProgress.value = 0;
				zipProgress.max = 0;
				// Modify visualized file name in list
				li.textContent = getParam("studyName")+"_"+getParam("id")+"_"+file.name+"  ";
				li.appendChild(zipProgress);
				fileList.appendChild(li);
			}, function(current, total) {
				zipProgress.value = current;
				zipProgress.max = total;
			}, function() {
				if (zipProgress.parentNode)
					zipProgress.parentNode.removeChild(zipProgress);
				fileInput.value = "";
				fileInput.disabled = false;
				// Send resulting blob to file upload module
				model.getBlob(function(blob) {
					$('#fileupload').fileupload('send', {files: blob});
				});
			});
		}, false);
		creationMethodInput.addEventListener('change', function() {
			model.setCreationMethod(creationMethodInput.value);
		}, false);
		}

	})();

})(this);
