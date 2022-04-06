<?php

class Database {

  private $dbConnection = null;

  public function __construct()
  {
    $host = 'localhost';
    $port = 3306;
    $db   = 'socialCats';
    $user = 'xxx';
    $pass = 'xxx';

    try {
      $this->dbConnection = new \PDO(
          "mysql:host=$host;port=$port;dbname=$db;charset=utf8",
          $user,
          $pass
      );
      $this->dbConnection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
  }

  public function connect()
  {
    return $this->dbConnection;
  }
}