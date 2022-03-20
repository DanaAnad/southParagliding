<?php
require "./database.php";
require "./datas.php";


header("Access-Control-Allow-Origin: *");
// http://southparagliding.ro
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Accept: *");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Accept, Authorization, X-Request-With");


$parsedUrl =  $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'].'/';
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$uri = explode( '/', $uri );

// endpoints starting with `/data` for GET, POST, DELETE posts
// everything else results in a 404 Not Found
if ($uri[1] !== 'data') {
  if($uri[1] !== 'datas'){
    header("HTTP/1.1 404 Not Found");
    exit();
  }
  print_r($uri[1]);
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
// pass the request method and post ID to the Post and process the HTTP request:
$controller = new Data($dbConnection, $requestMethod, $dataId, $type, $parsedUrl);
$controller->processRequest();