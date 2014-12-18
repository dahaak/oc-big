<?php 
// Use $_SESSION variables
session_start();
// Get path to delete
$path = dirname($_SERVER['SCRIPT_FILENAME']).'/files'.$_SESSION['oc_field'].'/';
// JGehlen delete $path='';
// Recursively delete all files and directories in the path passed as $str.
function recursiveDelete($str){
    if(is_file($str)){
         return @unlink($str);
    }
    elseif(is_dir($str)){
         $scan = glob(rtrim($str,'/').'/*');
         foreach($scan as $index=>$path){
         recursiveDelete($path);
         }
    return @rmdir($str);
    }
}

/* Clear uploaded files when the window is closed or refreshed. 
 * This is so that the user does not see the files that have been uploaded in the previous session 
 * - prav 030413 */
if (isset($path)) {
    recursiveDelete($path);
}
// Notify User of action
echo "This action will end your current session.<br/>All your files will be saved on the server.";
?>
