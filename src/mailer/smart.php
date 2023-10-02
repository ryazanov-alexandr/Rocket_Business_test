<?php 

if (empty($_POST)) {
    $_POST = json_decode(file_get_contents("php://input"), true) ? : [];
}

$name = $_POST['name'];
$phone = $_POST['phone'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP();                                      
$mail->SMTPAuth = true;                               
$mail->SMTPDebug = 0;                               
$mail->Host = 'smtp.yandex.ru';  
$mail->Username = 'ryazanov.a1exandr@yandex.ru';            
$mail->Password = '';            
$mail->setFrom('ryazanov.a1exandr@yandex.ru', 'Мед Клиника');   
$mail->addAddress('rbru-metrika@yandex.ru');     
$mail->SMTPSecure = 'ssl';   
$mail->Port = 465;                               

$mail->isHTML(true);                                 

$mail->Subject = 'Заявка';
$mail->Body    = 'Пользователь оставил данные <br> 
				Имя: ' . $name . ' <br>
				Телефон: ' . $phone;

if($mail->send()) {
	echo json_response(200, array(
		'data' => ['name' => $name, 'phone' => $phone]
	));
} else {
	echo json_response(500, 'Server error!');
}

function json_response($code = 200, $message = null)
{
    header_remove();
    
    http_response_code($code);
    
    header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
    
    header('Content-Type: application/json');
    $status = array(
        200 => '200 OK',
        400 => '400 Bad Request',
        422 => 'Unprocessable Entity',
        500 => '500 Internal Server Error'
        );
    
    header('Status: '.$status[$code]);
    
    return json_encode(array(
        'status' => $code < 300, 
        'message' => $message
        ));
}