<?php
class Login {
    public function __construct($db)
    {
        $this->db = $db;
        // Store the cipher method - CHANGE FOR PRODUCTION
        $this->ciphering = "AES-128-CTR";
        // Use OpenSSl Encryption method - CHANGE FOR PRODUCTION
        $this->iv_length = openssl_cipher_iv_length($this->ciphering);
        $this->options = 0;
        // Non-NULL Initialization Vector for encryption - CHANGE FOR PRODUCTION
        $this->encryption_iv = '1234567891011121';
        // Store the encryption key - CHANGE FOR PRODUCTION
        $this->encryption_key = "GeeksforGeeks";
        $this->sessionTime = 1; //minutes - CHANGE FOR PRODUCTION IF NEEDED
    }

    public function processRequest() {
        $response = null;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (!$this->validateLogin($input)) {
            $response = $this->unprocessableEntityResponse();
        }
        else {
            $response = $this->login($input);
        }
        
        $this->setResponse($response);
    }

    private function encrypt($someJson) {
        $simple_string = JSON_encode($someJson);
        // Display the original string
        // echo "Original String: " . $simple_string;
        // Use openssl_encrypt() function to encrypt the data
        $encryption = openssl_encrypt($simple_string, $this->ciphering,
                    $this->encryption_key, $this->options, $this->encryption_iv);
          
        // Display the encrypted string
        // echo "Encrypted String: " . $encryption . "\n";
        return $encryption;
  
    }

    public function decrypt($somestring) {
      // Use openssl_decrypt() function to decrypt the data
      $decryption=openssl_decrypt (
        $somestring, 
        $this->ciphering, 
        $this->encryption_key, 
        $this->options, 
        $this->encryption_iv);
      
        // Display the decrypted string
        // echo "Decrypted String: " . $decryption;
        return $decryption;
    }

    private function login($data) {
        $query = "
        SELECT
          *
        FROM
          users
        WHERE email = :user
        AND password = :pass;
      ";
  
      try {
        $response = $this->badRequestResponse( 'Wrong credentials');

        $statement = $this->db->prepare($query);
        $statement->execute(array(
            'user' => $data['u'], 
            'pass' => $data['p']
        ));
        
        $result = null;
        $result = $statement->fetch(\PDO::FETCH_ASSOC);

        if ($result['id']) {
            $encripted = $this->encrypt(array(
                'email' => $result['email'], 
                'password' => $result['password'],
                'strtotime' => strtotime("now")
            ));

            $query = "update users set token=:t, validUntil=now() where id=:id;";
            $statement = $this->db->prepare($query);
            $statement->execute(array(
                't' => $encripted, 
                'id' => $result['id']
            ));
            $response = $this->OKResponse('token',$encripted);
        }
        return $response;
      } catch (\PDOException $e) {
        exit($e->getMessage());
      }
    }
    public function setResponse($response) {
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function validateLogin($data){
        if (!$data['u'] || !$data['p']) {
            return false;
        }
        return true;
    }

    private function unprocessableEntityResponse() {

      $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
      $response['body'] = json_encode([
        'error' => 'Invalid input'
      ]);
      return $response;
    }
  
    private function notFoundResponse() {
      $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
      $response['body'] = null;
      return $response;
    }
  
    private function badRequestResponse($reason ='') {
      $response['status_code_header'] = 'HTTP/1.1 400 Bad Request';
      $response['body'] = json_encode(['error'=>$reason]);
      return $response;
    }  

    public function OKResponse($key='result',$reason =''){
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode([$key=>$reason]);
        return $response;        
    }

    public function unauthorizedRequestResponse($reason ='') {
        $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
        $response['body'] = json_encode(['error'=>$reason]);
        return $response;
    }  

    public function extendSession($user, $password, $token) {
        try {
                $query = "
                update users set validUntil = now()
                WHERE email = :user
                AND password = :password
                and token =:token
                and validUntil > now() - INTERVAL :interval MINUTE;
            ";
        
            $statement = $this->db->prepare($query);
            $statement->execute(array(
                'user' => $user, 
                'password' => $password,
                'token' => $token,
                'interval' => $this->sessionTime
            ));      
            $count = $statement->rowCount();
            return $count == 1;

        }
        catch (\PDOException $e) {
        //   print_r($e->getMessage());
          return false;
        }

    }
}
?>