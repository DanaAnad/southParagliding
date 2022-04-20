<?php

class Database {

  private $dbConnection = null;

  public function __construct()
  {
    $host = 'localhost';
    $port = 3306;
    $db   = 'r94573sout_southParagliding';
    $user = 'r94573sout';
    $pass = '?7I;?6I7y7v0';

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