/*
 * Created by:		Johan Gehlen
 * Last updated:	17-11-2014
 * Study:			OC-Big Demo
 */
		
//<script>
	/*
	 * Functions to run on document ready
	 */
	jQuery(document).ready(function($) {
		// Set the maximum number of upload buttons per tab:
		function showImagesAndLinks(spanClass){
			var count = 1;
			$(spanClass).each(function() {
				// Get parameter from eCRF, configuration is done within the right item text of the item in the eCRF
				var fileType = $(this).attr('fileType');
				var fileCount = $(this).attr('fileCount');
				var widthQ = $(this).attr('widthQ');
				var imgWidth = $(this).attr('imgWidth');
				var imgFloat = $(this).attr('imgFloat');
				var imgDefault = $(this).attr('imgDefault');
				var apacheBD = $(this).attr('apacheBD');
				var savePath = $(this).attr('savePath');
				var token = $(this).attr('token');
				// Change default input width (initial input only)
				$(this).parent().parent().find('input').css({'width':widthQ});
				// Show and enable button, image and links for the set number of upload buttons
				$(this).parent().append('<input type="button" class="button_medium" value="Upload" id="IMGbutton'+count+'">');
				$(this).parent().append(	'<script>'+
												'jQuery(document).ready(function($) {\n'+
													'$("#IMGbutton'+count+'").click(function(){\n'+
														'UploadStarter("#IMGbutton'+count+'", "'+fileType+'", "'+fileCount+'", "'+apacheBD+'", "'+savePath+'", "'+token+'");\n'+
													'});\n'+
													'// Enable the upload button\n'+
													'function UploadStarter(idSelector, fileType, allowedNr, apacheBD, savePath, token) {\n'+
														'// Get the id from the inputfield next to the button\n'+
														'var imgID = idSelector.replace("button","");\n'+
														'var itemId = $(imgID).parent().next().find(\'input\').attr(\'id\');\n'+
														'// Get the patient name and replace the html tabs at the end and the space before\n'+
														'var patient = $(\'.title_manage\').parent().parent().next().find(\'span\').html().replace(/&nbsp;/g, \'\');\n'+
														'patient = patient.replace(/ /g, \'\');\n'+
														'// Get the event number and replace the html tabs at the end and the space before\n'+
														'var event = $(\'.title_manage\').find(\'b\').html().split(\' \');\n'+
														'event = event[3];\n'+
														'// Get the study name and split the string at \'<\', the study name is the first element\n'+
														'var study = $(\'div.tablebox_center\').find(\'tr\').next().next().find(\'td\').next().html().split(\'<\');\n'+
														'study = study[0].replace(/ /g, \'\');\n'+
														'// Call OC-Big\n'+
														'window.open(\'/\'+apacheBD+\'/index.php?studyName=\'+study+\'&visit=\'+event+\'&id=\'+patient+\'&field=\'+itemId+\'&fileType=\'+fileType+\'&allowedNr=\'+allowedNr+\'&savePath=\'+savePath+\'&token=\'+token, \'OC-Big Upload Tool\', \'width=900,height=600,scrollbars=yes\');\n'+			
													'}\n'+
												'});\n'+
											'</script>');
				// Add a div tag for the images and show links (data might already have been entered)
				$(this).parent().parent().find('.aka_text_block').append('<div id="IMG' + count + '"></div>');
				showDownloadLinks('#IMG'+count, apacheBD, savePath, token);
				// Show image (default or preview)
				showImage('#IMG'+count,{'width':imgWidth,'float':imgFloat}, imgDefault);
				// Prepare for next image upload in tab
				count++;
			});
		}
		// Run function on document ready
		showImagesAndLinks('.uploadButton');
		
		// Show uploaded files in a list and hide the input field
		function showDownloadLinks(idSelector, apacheBD, savePath, token){
			var value = $(idSelector).parent().next().find('input').attr('value');
			if (value != '' && value != null) {
				$(idSelector).parent().next().find('input').hide();
				var files = value.split(',');
				showDownloadList(files, idSelector, apacheBD, savePath, token);
			}
		}
		
		// Create links to allow download of files in the input field
		function showDownloadList(array, idSelector, apacheBD, savePath, token) {
			// Get the field ID
			var field = $(idSelector).parent().next().find('input').attr('id');
			// Create a list object
			var ObjUl = $('<ul style="width: 180px;" id="' + field + 'List"></ul>');
			// Add content from the array to the list
			for (i = 0; i < array.length; i++)
			{
				var Objli = $('<li></li>');
				var Obja = $('<a></a>');
				Obja.attr('href', '/' + apacheBD + '/download.php?savePath=' + savePath + array[i] + '&token=' + token);
				Obja.text(array[i]);
				Objli.append(Obja);
				ObjUl.append(Objli);
			}
			// Show the list on the OpenClinica eCRF
			$(idSelector).parent().next().append(ObjUl);
		}

		// Show a preview on the OpenClinica eCRF of uploaded images
		function showImage(idSelector, cssMap, imgDefault) {
			// Get the desired CSS for the image from cssMap
			var vCSS = ""
			for (css in cssMap) {
				vCSS = vCSS + css + ":" + cssMap[css] + ";"; 
			}
			// Get the URL to check the OpenClinica view being used
			var vPath = location.pathname;
			if (vPath.search('ViewSectionDataEntry') > 0) {
				// The user is viewing the data (magnifying glass symbol)
				// Hide the button to make sure it is not clicked
				$(idSelector).parent().parent().find('.button_medium').hide();
			}
			// Append image
			appendImage(idSelector, vCSS, imgDefault);
		}
		
		// Append image to IMG-ID
		function appendImage(idSelector, vCSS, imgDefault) {
			// Check if a file has been uploaded
			var imgLink = $(idSelector).parent().next().find('a').attr('href');
			// An empty list returns undefined
			if (typeof imgLink == 'undefined') {
				// Use default image if the list is empty
				imgLink = imgDefault;
			}
			// Check if there already is a div-tag
			var preview = $(idSelector).parent().find('div');
			if(preview.html() != '') {
				// Remove previous preview
				preview.remove();
			}
			// Append image
			$(idSelector).parent().append('<div><br><img ' +
				//with the chosen CSS:
				'style="' + vCSS + '" ' +
				//alternative text:
				'alt="" ' + 
				//or link to image:
				'src="' + imgLink + '"></div>');
		}
	});
	
	
	/*
	 * Interaction from OC-big must be in plain JavaScript to allow runtime access
	 */

	// Set the value of the input field
	function setValue(idSelector, value){
		document.getElementById(idSelector).value = value;	
	}

	// Refresh preview after upload and to show a list
	function refreshPreview(idSelector, cssMap, apacheBD, token){
		//get the content of the input field
		var value = document.getElementById(idSelector).parentNode.getElementsByTagName('input')[0].value;
		//if not empty
		if (value != '') {
			// Hide the input field
			document.getElementById(idSelector).type="hidden";
			// Show the list
			var savePath = $(idSelector).parentNode.parentNode.getElementsByTagName('span')[0].getAttribute('savePath');
			changeToArray(idSelector, apacheBD, savePath, value, token);
			// Change the image
			previewUploadedImage(idSelector, cssMap);
		}
	}

	// Create links for download in eCRF
	function changeToArray(idSelector, apacheBD, savePath, value, token) {
		// Start list
		var newList = '<ul style="width: 180px;" id="' + idSelector + 'List">';
		// Separate input
		valueList = value.split(",");
		// Add input to list
		for(i = 0; i < valueList.length; i++){
			newList = newList + '<li><a href="/' + apacheBD + '/download.php?savePath=' + savePath + valueList[i] + '&token=' + token + '">' + valueList[i] + '</a></li>';
		}
		// Close the list
		newList = newList + '</ul>';
		// Get the insert point and check if there is an old list
		var parent = document.getElementById(idSelector).parentNode;
		var oldList = document.getElementById(idSelector + 'List');
		// Remove old list if present
		if(oldList != null) {
			parent.removeChild(oldList);
		}
		// Attach new list
		parent.innerHTML = parent.innerHTML + newList;
	}
	
	// Refresh preview image to show the upload was successful
	function previewUploadedImage(idSelector, cssMap) {	
		// Get the appropriate image link from the first element from the list
		var imageLink = document.getElementById(idSelector + 'List').getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute("href");
		// Get the desired CSS for the image from cssMap
		var vCSS = ""
		for (css in cssMap) {
			vCSS = vCSS + css + ":" + cssMap[css] + ";"; 
		}
		// Refresh the image, the file-type has been checked during upload
		var preview = document.getElementById(idSelector).parentNode.parentNode.getElementsByTagName('div')[0].parentNode;
		var imageDiv = document.getElementById(idSelector).parentNode.parentNode.getElementsByTagName('div')[1];
		//remove previous preview
		imageDiv.remove();
		//attach new image preview
		preview.innerHTML = preview.innerHTML + '<div><br><img ' +
			//with the chosen CSS:
			'style="' + vCSS + '" ' +
			//alternative text:
			'alt="" ' + 
			//image:
			'src="'+ imageLink + '"></div>';
	}
//</script>