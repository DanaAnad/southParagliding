<?php
class Data {
  private $db;
  private $requestMethod;
  private $dataId;

  public function __construct($db, $requestMethod, $dataId, $type=false, $baseUrl)
  {
    $this->db = $db;
    $this->requestMethod = $requestMethod;
    $this->dataId = $dataId;
    $this->type = $type;
    $this->uploadFolder = "upload/";
    $this->baseUrl = $baseUrl;
    
  }

  public function processRequest()
  {
    $response = array();
    switch ($this->requestMethod) {
      case 'GET':
        if ($this->dataId && !$this->type) {
          $response = $this->getData($this->dataId);
        } 
        else if (!$this->dataId && $this->type) {
          $response = $this->getAllDataType($this->type);
        }
        else {
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
    $query = "
      SELECT
        *
      FROM
        data;
    ";

    try {
      $statement = $this->db->query($query);
      $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
      foreach ($result as $index => $row){
        foreach ($row as $key => $value) {
          if ($key === 'data') {
            $encodedData = json_decode($value, true);
            $row[$key] = $encodedData;
          }
        }
        $result[$index] = $row;
      }
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
    if (!$result) {
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

  private function handleFileUpload($data) {
    $phpFileUploadErrors = array(
      0 => 'There is no error, the file uploaded with success',
      1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
      2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
      3 => 'The uploaded file was only partially uploaded',
      4 => 'No file was uploaded',
      6 => 'Missing a temporary folder',
      7 => 'Failed to write file to disk.',
      8 => 'A PHP extension stopped the file upload.',
    );
    if(isset($_FILES["attachedFile"]))  {

      if ( $_FILES["attachedFile"]["error"] !== 0) {
        throw new Exception(phpFileUploadErrors[$_FILES["attachedFile"]["error"]]);
      }

      $allowed = array("jpg" => "image/jpg", "jpeg" => "image/jpeg", "gif" => "image/gif", "png" => "image/png", "mp4"=>"video/mp4");
      // https://github.com/nginx/nginx/blob/master/conf/mime.types

      $filename = $_FILES["attachedFile"]["name"];
      $filetype = $_FILES["attachedFile"]["type"];
      $filesize = $_FILES["attachedFile"]["size"];

      $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
      if(!array_key_exists($ext, $allowed)) {
        throw new Exception( 'Please select a valid file format.');
      }

      // Verify file size - 5MB maximum
      $maxsize = 50* 1024 * 1024;
      if($filesize > $maxsize) {
        throw new Exception( 'Filesize '.$filesize.' > maxsize'.$maxsize);

      }

      $mewFilename = uniqid(rand(), false).'.'.$ext;

      if(!file_exists($this->uploadFolder . $filename)){
        move_uploaded_file($_FILES["attachedFile"]["tmp_name"], "upload/" . $mewFilename);
        $data['fileName'] = $this->baseUrl.$this->uploadFolder.$mewFilename;
      }
      else{
        throw new Exception( $mewFilename.' already exits.');
      }

    }
    return $data;
  }
  
  private function createData() {
    if (! $this->validatePost($_POST)) {
      return $this->unprocessableEntityResponse();
    }

    try {
      $data = $this->handleFileUpload([]);
    }
    catch(Exception $e) {
      return $this->badRequestResponse($e->getMessage());
    }
    

    $query = "
      INSERT INTO data
        (data, type, status)
      VALUES
        (:data, :type, :status);
    ";
    foreach($_POST as $key =>  $value) {
      if ($key !== 'type' && $key !== 'status' && $key !== 'attachedFile') { //array includes ?
        $data[$key] = $value;
      }
    }

    try {
      $statement = $this->db->prepare($query);
      $statement->execute(array(
        'data' => json_encode($data),
        'type'  => $_POST['type'],
        'status' => !isset($_POST['status']) || $_POST['status'] !== "1" ? 0 : 1
      ));
      $lastId = $this->db->lastInsertId();
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }

    $response['status_code_header'] = 'HTTP/1.1 201 Created';
    $response['body'] = json_encode(array('id' => $lastId));
    return $response;
  }

  private function changeDataStatus($id)  {
    try {
      if (!is_int($id)) {
        throw new Exception('supplied id not valid');
      }

      $result = $this->find($id);

      if (! $result) {
        return $this->notFoundResponse();
      }

      $input = (array) json_decode(file_get_contents('php://input'), TRUE);

      if (! $this->validateStatus($input)) {
        return $this->unprocessableEntityResponse();
      }

      try {
        $query = " UPDATE data SET status = :status WHERE id = :id;";
        $statement = $this->db->prepare($query);
        
        $statement->execute(array(
          'id' => $id,
          'status' => $input['status']
        ));

        $statement->rowCount();
      } catch (\PDOException $e) {
        throw $e;
      }
    } catch (Exception $e) {
      return $this->badRequestResponse($e->getMessage());
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
      if ($result['data']) {
        $encodedData = json_decode($result["data"], true);
        $result['data']=$encodedData;   
      }
      return $result;
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
  }

  public function findByType($type) {
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
      foreach ($result as $index => $row){
        foreach ($row as $key => $value) {
          if ($key === 'data') {
            $encodedData = json_decode($value, true);
            $row[$key] = $encodedData;
          }
        }
        $result[$index] = $row;
      }
      return $result;
    } catch (\PDOException $e) {
      exit($e->getMessage());
    }
  }

  private function validatePost($post)
  {
    if (! isset($post['type'])) {
      return false;
    }
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

  private function badRequestResponse($reason ='')
  {
    $response['status_code_header'] = 'HTTP/1.1 400 Bad Request';
    $response['body'] = json_encode(['error'=>$reason]);
    return $response;
  }  
}