import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UrlApi from "../apiUrlConfig.js";


export default function Login () {

    const history = useHistory();

    const [email, setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);


    const handleLoginButtonAvailability = () => {
        if((email.length && password.length) !== 0){
            setLoginButtonDisabled(false);
        } else return (setLoginButtonDisabled(true));

    }
    useEffect((e)=> {
        try{
        handleLoginButtonAvailability();
        }
        catch(e){
            throw new Error("UseEffectc error")
        }    
    })
  
const loginUser =  async () => {
    let data;
        const headers = {
            "Content-Type": "application/json"
        };        
        data = JSON.stringify({"u":email, "p":password});
            try{
                const response = await axios({
                    method:"POST",
                    url:UrlApi.login,
                    headers:headers,
                    data
                })
                if(response.status === 200){
                    sessionStorage.setItem('token', response.data.token);
                    history.push("/admin", {token:response.data.token})
                }
            }
            catch (error) {
                setError(error)
                throw new Error("User is not logged in. Close this error and try again.")
            }
    }
 
   const handleSubmit = async (e) => {
       e.preventDefault();
       loginUser();
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
            {error && (<h5 style = {errorStyle}>Log in failed. Check you credentials.</h5>)} 
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
                        <Button type="submit" disabled = {loginButtonDisabled}>Log in</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
