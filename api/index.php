<?php

require "./database.php";
require "./datas.php";
require "./login.php";


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin");
// header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header('Access-Control-Allow-Headers: Authorization, Access-Control-Allow-Headers, Content-Type, Accept, X-Request-With');
header('Accept: */*');

if (!function_exists('getallheaders')) 
{ 
    function getallheaders() 
    { 
           $headers = []; 
       foreach ($_SERVER as $name => $value) 
       { 
           if (substr($name, 0, 5) == 'HTTP_') 
           { 
               $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value; 
           } 
       } 
       return $headers; 
    } 
} 

$parsedUrl =  $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'].'/';
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$uri = explode( '/', $uri );
// print_r($uri);


if ($uri[1] !== 'data' && $uri[1] !== 'datas' && $uri[1] !== 'login') {
  header("HTTP/1.1 404 Not Found");
  exit();      
}
// endpoints starting with `/datas` for GET by type results in a 404 Not Found
// the post id is, of course, optional and must be a number; same with type
$dataId = null;
$type = null;

if ($uri[1] == 'datas' and isset($uri[2])) {
    $type = (string) $uri[2];
}

if ($uri[1] == 'data' and isset($uri[2])) {
    $dataId = (int) $uri[2];
}


$requestMethod = $_SERVER["REQUEST_METHOD"];
$dbConnection = (new Database())->connect();

if ($requestMethod == 'POST' && $uri[1] == 'login') {
  $controller = new Login($dbConnection);
}
else if ($requestMethod !== 'GET' && $uri[1] !== 'login') {
  $headers = getallheaders();
  $loginController = new Login($dbConnection);

  if (!$headers['Token']) {
    $response = $loginController->unauthorizedRequestResponse("Unauthorized");
    $loginController->setResponse($response);
    exit();      
  } 

  $creds = $loginController->decrypt($headers['Token']);
  $creds = json_decode($creds, true);
  if (!isset($creds['email']) || !isset($creds['password'])) {
    $response = $loginController->unauthorizedRequestResponse("Unauthorized");
    $loginController->setResponse($response);
    exit();
  }

  $wasSessionExtended = $loginController->extendSession($creds['email'], $creds['password'], $headers['Token']);

  if (!$wasSessionExtended) {
    $response = $loginController->unauthorizedRequestResponse("Unauthorized");
    $loginController->setResponse($response);
    exit();
  }

  // pass the request method and data to Data object and process the HTTP request:
  $controller = new Data($dbConnection, $requestMethod, $dataId, $type, $parsedUrl);  
}
else if ($requestMethod == 'GET') {
  $controller = new Data($dbConnection, $requestMethod, $dataId, $type, $parsedUrl);  
}

$controller->processRequest();