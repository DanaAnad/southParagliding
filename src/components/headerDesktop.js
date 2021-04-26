import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/Logo/LOGO@2x.png";

export default class Header extends React.Component { 
    render(){  
        return(
            <div className="logoContainer">
                <img className="imgLogo" src = {logo} alt = "logo"/>
            </div>
        )
    }
        
}