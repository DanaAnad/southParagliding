import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function Login ({ setToken }) {

    const [email, setEmail]=useState("");
    const [password, setPassword] = useState("");

   const loginUser = async (credentials) => {
        return fetch("http://localhost:8080/admin", {
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(credentials)
        })
        .then(data => data.json());
   }

   const handleSubmit = async (e) => {
       e.preventDefault();
       const token = await loginUser({
           email,
           password
       });
       setToken(token);
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
            <h3 style = {h3Style}>Login</h3>
            <div className="loginForm" style = {formStyle}>
                <Form  >
                    <Form.Group>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                    <br />
                    <Form.Control type="password" name="password" placeholder=" Password" onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <br/><br />
                    <Button type="submit" onClick = {handleSubmit} onTouchEnd={handleSubmit}>Log in</Button>
                </Form>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }