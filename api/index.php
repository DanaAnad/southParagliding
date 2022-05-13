<?php
// echo $_SERVER['REQUEST_METHOD'];
require "./database.php";
require "./datas.php";
require "./login.php";

header("Access-Control-Allow-Headers: Origin");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header('Access-Control-Allow-Headers: Authorization, Access-Control-Allow-Headers, Content-Type, Accept, X-Request-With, token, Token');
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
    // print_r($headers);
} 


$parsedUrl =  $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'].'/';
// print_r($parsedUrl);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
// print_r($uri[1]);


$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($uri[1] !== 'data' && $uri[1] !== 'datas' && $uri[1] !== 'login' && $requestMethod !== 'OPTIONS') {
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

$dbConnection = (new Database())->connect();

if ($requestMethod == 'POST' && $uri[1] == 'login') {
  $controller = new Login($dbConnection);
}
else if ($requestMethod !== 'GET' && $requestMethod !== 'OPTIONS' && $uri[1] !== 'login') {
  $headers = getallheaders();
  $loginController = new Login($dbConnection);

  if ( !isset($headers['Token']) && !isset($headers['token']) ) {
//     print_r( isset($headers['token']) );
    $response = $loginController->unauthorizedRequestResponse("Unauthorized-No Token");
    $loginController->setResponse($response);
    exit();      
  } 
  $foundToken = '';
  if ( isset($headers['Token']) ) {
      $foundToken = $headers['Token'];
  }
  
  if ( isset($headers['token']) ) {
      $foundToken = $headers['token'];
  }  
  
  $creds = $loginController->decrypt($foundToken);
  $creds = json_decode($creds, true);
  if (!isset($creds['email']) || !isset($creds['password'])) {
    $response = $loginController->unauthorizedRequestResponse("Unauthorized-Invalid Token");
    $loginController->setResponse($response);
    exit();
  }

  $wasSessionExtended = $loginController->extendSession($creds['email'], $creds['password'], $foundToken);

  if (!$wasSessionExtended) {
    $response = $loginController->unauthorizedRequestResponse("Unauthorized-Token not extended");
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
