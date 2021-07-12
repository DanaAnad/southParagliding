<?php
class Data {
  private $db;
  private $requestMethod;
  private $dataId;

  public function __construct($db, $requestMethod, $dataId, $type=false)
  {
    $this->db = $db;
    $this->requestMethod = $requestMethod;
    $this->dataId = $dataId;
    $this->type = $type;
    
  }

  public function processRequest()
  {
    $response = array();
    switch ($this->requestMethod) {
      case 'GET':
        if ($this->dataId && !$this->type) {
          // debug("getDataById");
          $response = $this->getData($this->dataId);
        } 
        else if (!$this->dataId && $this->type) {
          // debug("getDataByType");
          $response = $this->getAllDataType($this->type);
        }
        else {
          // debug("getDataAllDatas");
          $response = $this->getAllDatas();
        };

        break;
      case 'POST':
        $response = $this->createData();
        break;
      case 'PUT':
        $response = $this->changeDataStatus($this->dataId);
        break;
      case 'DELETE':
        $response = $this->deleteData($this->dataId);
        break;
      default:
        $response = $this->notFoundResponse();
        break;
    }


    header($response['status_code_header']);
    if ($response['body']) {
      echo $response['body'];
    }
  }

  private function getAllDatas()
  {
    // print_r( 'we are here');
    $query = "
      SELECT
        *
      FROM
        data;
    ";

    try {
      $statement = $this->db->query($query);
      $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
    //   print_r($result);
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }

    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode($result);
    
    return $response;
  }

  private function getData($id)
  {
    $result = $this->find($id);
    if (! $result) {
      return $this->notFoundResponse();
    }
    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode($result);
    return $response;
  }

  private function getAllDataType($type) {
    
    $result = $this->findByType($type);
    if (! $result) {
      return $this->notFoundResponse();
    }
    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode($result);
    return $response;
  }

  private function createData()
  {
    $input = (array) json_decode(file_get_contents('php://input'), TRUE);
    if (! $this->validatePost($input)) {
      return $this->unprocessableEntityResponse();
    }

    $query = "
      INSERT INTO data
        (data, type, status)
      VALUES
        (:data, :type, :status);
    ";

    try {
      $statement = $this->db->prepare($query);
      $statement->execute(array(
        'data' => $input['data'],
        'type'  => $input['type'],
        'status' => $input['status'] || 1
      ));
      // $lastId = $statement->rowCount();
      $lastId = $this->db->lastInsertId();
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }

    $response['status_code_header'] = 'HTTP/1.1 201 Created';
    $response['body'] = json_encode(array('id' => $lastId));
    return $response;
  }

  private function changeDataStatus($id)
  {
    $result = $this->find($id);

    if (! $result) {
      return $this->notFoundResponse();
    }

    $input = (array) json_decode(file_get_contents('php://input'), TRUE);

    if (! $this->validateStatus($input)) {
      return $this->unprocessableEntityResponse();
    }
    
    $query = " UPDATE data SET status = :status WHERE id = :id;";

    try {
      $statement = $this->db->prepare($query);
      
      $statement->execute(array(
        'id' => $id,
        'status' => $input['status']
      ));

      $statement->rowCount();
      
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode(array('message' => 'Data Updated!'));
    return $response;
  }

  private function deleteData($id)
  {
    $result = $this->find($id);

    if (! $result) {
      return $this->notFoundResponse();
    }

    $query = "
      DELETE FROM data
      WHERE id = :id;
    ";

    try {
      $statement = $this->db->prepare($query);
      $statement->execute(array('id' => $id));
      $statement->rowCount();
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
    $response['status_code_header'] = 'HTTP/1.1 200 OK';
    $response['body'] = json_encode(array('message' => 'Data Deleted!'));
    return $response;
  }

  public function find($id)
  {
    $query = "
      SELECT
        *
      FROM
        data
      WHERE id = :id;
    ";

    try {
      $statement = $this->db->prepare($query);
      $statement->execute(array('id' => $id));
      $result = $statement->fetch(\PDO::FETCH_ASSOC);
      return $result;
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
  }

  public function findByType($type) {
    // debug("are we gere");
    $query = "
      SELECT
        *
      FROM
        data
      WHERE type = ?;
    ";
    
    try {
      
      $statement = $this->db->prepare($query);
      $statement->execute([$type]);
      $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
      return $result;
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
  }

  private function validatePost($input)
  {
    if (! isset($input['data'])) {
      return false;
    }
    if (! isset($input['type'])) {
      return false;
    }

    // if (! isset($input['status'])) {
    //   return false;
    // }

    return true;
  }

  private function validateStatus($input)
  {
    $availableStatuses = array(0, 1);

    if (! isset($input['status'])) {
      return false;
    }
    if (! in_array($input['status'], $availableStatuses)) {
      return false;
    }
    
    return true;
  }

  private function unprocessableEntityResponse()
  {
    $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
    $response['body'] = json_encode([
      'error' => 'Invalid input'
    ]);
    return $response;
  }

  private function notFoundResponse()
  {
    $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
    $response['body'] = null;
    return $response;
  }
}