<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$mail = $_POST['mail'];
$success = [];
$symbols = ["<", ">","=", ";", "/", "%"];
for ($i = 0; $i<count($symbols); $i++){
    if (strpos($name, $symbols[$i])){
        $name = str_replace($symbols[$i],'', $name);
    };
    if (strpos($phone, $symbols[$i])){
        $phone = str_replace($symbols[$i],'', $phone);
    };
    if (strpos($mail, $symbols[$i])){
        $mail = str_replace($symbols[$i],'', $mail);
    }
}
if (preg_match("/@/", $mail)){
    $success['email'] = 'valid';
}else{
    $success['email'] = 'invalid';
}
if (preg_match("/^\d+$/", $phone) && strlen($phone)>9){
    $success['phone'] = 'valid';
}else{
    $success['phone'] = 'invalid';
}
$success = json_encode($success);
echo $success;