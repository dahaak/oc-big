/*This Script starts the OpenClinica-Big Data tool
 ************************************************************************************************************
 *A button was added to the eCRF to allow for:
 *	# previewing the image after upload before commiting to save
 *	# change the function after a succesfull upload to start calculations using a web service
 *	# the results of the calculations will be inserted on the next tab with 
 ************************************************************************************************************
 *In order to use this script put the following line into the INSTRUCTIONS column of the Sections tab:
 *	<script src="PATH/showImage.js" type="text/javascript"></script>
 *Replace the filepath (PATH) to have it point to this file, for example:
 *	http://openclinica2.rwth-aachen:8080/openclinica/javascript
 *The PATH must be located within the TOMCAT webapps folder. As shown in the example I have created a folder
 *in the OpenClinica-deployment folder named 'javascript'.
 ************************************************************************************************************
 *Buttons are defined in the LEFT_ITEM_TEXT column of the Items tab of the export field:
 *	<input type="button" class="button_medium" value="button text" id="buttonID">
 *You simply replace the 'button text' and the 'buttonID' to the appropiate values.
 *These values are given in the comments of the specific functions.
 *Due to the class your button will have the same style as other buttons. 
 ************************************************************************************************************
  Created by:		Johan Gehlen
  Last updated:		15-04-2013
*/

//Script to show the preview image and to enable the calculate function
	jQuery(document).ready(function($) {

		function UploadStarter(pIDSelector) {

			//get the id from the inputfield next to the button
			var itemId = $(pIDSelector).parent().next().find('input').attr('id');
			//get the patient name and replace the html tabs at the end and the space before
			var patient = $('.title_manage').parent().parent().next().find('span').html().replace(/&nbsp;/g, '');
			//get the study name and slpit the string by '<', the study name is the first element
			var study = $('div.tablebox_center').find('tr').next().next().find('td').next().html().split('<');
			//delete empty spaces
			patient = patient.replace(/ /g, '');
			study = study[0].replace(/ /g, '');
			//call the popup
			javascript:openDocWindow('/file_upload_plugin/?studyName='+study+'&id='+patient+'&field='+itemId+'\'');
		}
		
		//Run function on click by button with id='UPLOAD', each upload button on a tab must have a unique ID.
		$("#UPLOAD").click(function(){
			$(UploadStarter('#UPLOAD'));
		});
	});
