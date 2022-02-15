import React, {useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function Login ({ setToken }) {

    const [email, setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

   const loginUser = async (credentials) => {
        if(
            (email === "dana@gmail.com" && password === "dana") ||
            (email === "mircea@gmail.com" && password === "mircea")
        ) {
            return fetch("http://localhost:8080/admin", {
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify(credentials)
            })
            .then(
                data => data.json())
            .catch(err => console.log(err))
        } 
    } 
    useEffect(() => {
        const tokenAdmin = sessionStorage.getItem("token");
        console.log("tokenAdmin::", tokenAdmin);
    });
    

   const handleSubmit = async (e) => {
       e.preventDefault();
       const token = await loginUser({
        email,
        password
    });
    if(token){
        setToken(token);
    } else { 
        setError("Datele introduse sunt gresite. Verifica te rog.");
    };
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

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
  }
