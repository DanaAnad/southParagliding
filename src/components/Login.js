import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default function Login () {

    const history = useHistory();

    const [email, setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);


const loginUser =  async () => {
    let data;
        const apiUrl = "http://ms.homens.tricu.ro/login";
        const headers = {
            "Content-Type": "application/json"
        };
        data = JSON.stringify({"u":email, "p":password});
        console.log("stringgg::", data)
        try{
            const response = await axios({
                method:"POST",
                url:apiUrl,
                headers:headers,
                data
            })
            console.log("response::", response.data.token);
            if(response.status === 200){
                setToken(response.data.token)
                console.log("tokenLogin::", token);
                history.push('/admin', {token:response.data.token});
            }
        }
        catch (error) {
            console.log("errorPostLogin::", error);
            setError(true);

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
                    <Button type="submit">Log in</Button>
                </Form>
            </div>
        </div>
    </div>
    )
}