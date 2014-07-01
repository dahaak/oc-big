<?php 
$path='';
/* This function recursively delete all files and directories in the path passed as $str. - prav 030413 */
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

/* We use this to clear the /files/ directory of all files when the window is closed or refreshed. This is so that the user does not see the files that have been uploaded in the previous session - prav 030413 */
/* Please be very careful in modifying the path variable below. */ 
/* Infact do not change anything till you are very sure of what you are doing. */ 

$path='/var/www/oc-db-100/server/php/files/';
if (isset($path)) {
    recursiveDelete($path);
    }

echo "This action will end your current session. All your files will be saved in /openclinica directory on the server";
?>
