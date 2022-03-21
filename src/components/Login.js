import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default function Login () {

    const [email, setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [error] = useState("");


const loginUser =  async () => {
    console.log("email::::", email);
    console.log("PASS:::", password); 
        try{
            const apiUrl = " http://api.southparagliding.ro/data/users";
            const headers = {
                'Content-Type' : 'application/json'
            };
            const data  = {
                email:email, 
                password:password
            }
            const response = await axios.post(apiUrl, headers, data)
            console.log("response login api::", response);
            console.log("EXECUTION CHECKK!!")
        }
        catch (error) {
            console.log("errorPostLogin::", error);
            throw new Error(error.message);
        }
    }
 

   const handleSubmit = async (e) => {
       e.preventDefault();
       loginUser();
       return false;
   }

    let errorStyle = {
            textAlign:"center",
            margin:"auto",
            alignItems:"center",
            width:"50%",
            paddingTop: "100px",
            color:"red"
    }

    let formStyle = {
            paddingTop:"50px",
            width: '30%' ,
            margin: 'auto',
            textAlign: 'center',
    }
    let h3Style = {
            alignItems: 'center',
            paddingTop:"100px",
            width: '30%' ,
            margin: 'auto',
            textAlign: 'center',
    }

    return (
    <div>
       {error && (<h5 style = {errorStyle}>{error}</h5>)} 
        <div>
           <h3 style = {h3Style}>Login</h3> 
            <div className="loginForm" style = {formStyle}>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                    <br />
                    <Form.Control type="password" name="password" placeholder=" Password" onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <br/><br />
                    <Button type="submit">Log in</Button>
                </Form>
            </div>
        </div>
    </div>
    )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired,
//   }
