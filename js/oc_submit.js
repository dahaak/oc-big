/*
 * Return the names of uploaded files to OpenClinica,
 * these are stored like in the basic upload tool.
 * 
 * This script also contains the function to get parameters from the URL.
 */

// Run on closed or saved
var fileSaveClose=1;

// Get current URL
var path = window.location.pathname.replace('/index.php', '');
// Before leaving the cuurent window save the file names in OpenClinica
window.onbeforeunload = function(){
	if (fileSaveClose == 2){
		// Close the window, files have been saved
	}else{
		// TODO JGehlen: check for need of deleting files when chunking => resume
//		var close = confirm('Delete files on the server?');
//		if (close) {
//			// Run the cleaner, it does not close. Onbeforeunload is not cancalable!
//			cleanAndClose();
//		} else {
//			//not possible to abort
//		}
		// Show the "leave this page" box with no extra text.
		// You can display text in the header of the box with: return 'String';
		return '';
	}
};

// Set value in OpenClinica
function submitVal() {
	// Show a message with yes and cancel options
	var close = confirm('This will close the upload tool and store the file names in the eCRF.');
	// Close and save the file names to the eCRF
	if (close) {		
		//if (check) {
		//		IMI: Implement extra checks here, for example a minimum number of files
		//} else {
			//set values in the according field, clean the temporary folder and close the pop up 
			var field = getParam('field');
			setVal(field, cleanAndClose);
		//}					
	}
	else {
		//continue working in the upload tool
	}
}

// Get parameters from the URL
function getParam(param){ 
	// Get the param string of the url
	var url = window.location.search.substring(1); 
	//split at '&' to get the parameters
	var params = url.split("&"); 
	// Split at '=' to get the parameter and corresponding value
	for (var i = 0; i < params.length; i++) {  
		var paramPair = params[i].split("=");  
		if(paramPair[0] == param){
			// The last value has a %val attached, crop just in case
			var value = paramPair[1].split("%");
			return value[0];
		}
	}
	//else return null for evaluation
	return null;
}

// Set the values in the eCRF and refresh preview
function setVal(field, callback) {						
	// Store the uploaded file names in an array 
	var uploadedElements = [];
	var list = document.getElementsByTagName('a');
	// There is a <a>-tag in the footer so use list.length-1
	for(var i=0; i<list.length-1; i++) {
		// Only add elements that are uploaded
		var file = list[i].getAttribute('download');
		// Ignore binary large objects, the name is not the name of the files it contains
		if(!(file.indexOf("_blob") > 0)) {
			// The preview of images generates an extra tag
			if(file.indexOf(".jpg") >0 || file.indexOf(".png") > 0) {
				i++;
				uploadedElements.push(file);
			}
			else {
				uploadedElements.push(file);
			}
		}
	}
	// Add file names from binary large objects
	if(document.getElementById('file-list') != null) {
		var list2 = document.getElementById('file-list').childNodes;
		for(var i=0; i<list2.length; i++) {
			//add zipped elements that were uploaded
			uploadedElements.push(list2[i].textContent);
		}
	}
	//create a string concatenated with ',' from the array
	var uploadedFiles = uploadedElements.join(',');
	// Set value
	opener.setValue(field, uploadedFiles);
	// Get access options for download
	var apacheBD = window.location.pathname.split("/")[1];
	var token = getParam('token');
	// Refresh preview
	opener.refreshPreview(field, {'width':'240px','float':'right'}, apacheBD, token);
	// Call cleanAndClose()
	callback();
}

// Clean the temporary folder and close the pop up
function cleanAndClose() {
	//call cleaner
	$.ajax({type: 'GET', url: path + '/server/php/files_clear.php',
		success: function(response){
			fileSaveClose=2;
		}
	}).done(function() {
		//close pop up
		window.close();
	});			
}