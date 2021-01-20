<?php
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['mail'];
 
 
 
    // формируем URL в переменной $queryUrl
    
    $queryUrl = 'https://b24-g1k2g7.bitrix24.ru/rest/1/k7cv1xv3b4mxlypx/crm.lead.add.json';
    // формируем параметры для создания лида в переменной $queryData
    $queryData = http_build_query(array(
        'fields' => array(
    'TITLE' => 'RU Заявка c сайта',
    'NAME' => $name,
    'EMAIL' => Array(
           "n0" => Array(
               "VALUE" => "$email",
               "VALUE_TYPE" => "WORK",
           ),
       ),
       'PHONE' => Array(
           "n0" => Array(
               "VALUE" => "$phone",
               "VALUE_TYPE" => "WORK",
           ),
       ),
  ),
        'params' => array("REGISTER_SONET_EVENT" => "Y")
    ));
    // обращаемся к Битрикс24 при помощи функции curl_exec
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_POST => 1,
        CURLOPT_HEADER => 0,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $queryUrl,
        CURLOPT_POSTFIELDS => $queryData,
    ));
    $result = curl_exec($curl);
    curl_close($curl);
    $result = json_decode($result, 1);
    if (array_key_exists('error', $result)) echo "Ошибка при сохранении лида: ".$result['error_description'].
    "<br/>";
 
?>