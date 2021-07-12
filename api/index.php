<?php
function debug($var) {
  // echo "<pre>";
  print_r($var);
  // echo "</pre>";
}

require "./database.php";
require "./datas.php";


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
// debug($uri);

// endpoints starting with `/data` for GET, POST, DELETE posts
// everything else results in a 404 Not Found
if ($uri[1] !== 'data') {
  if($uri[1] !== 'datas'){
    header("HTTP/1.1 404 Not Found");
    exit();
  }
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

// if ($uri[1] == 'status' and isset($uri[2])) {
//   $dataId = (int) $uri[2];
// }

$requestMethod = $_SERVER["REQUEST_METHOD"];

$dbConnection = (new Database())->connect();
// pass the request method and post ID to the Post and process the HTTP request:
$controller = new Data($dbConnection, $requestMethod, $dataId, $type);
$controller->processRequest();