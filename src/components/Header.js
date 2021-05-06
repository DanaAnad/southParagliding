import React from 'react';
import logo from "../assets/Logo/LOGO@2x.png";

export default class Header extends React.Component { 
   

    render(){  
        
        return(
            <div className="headerDesktop">
            <div className="logoContainer">
                <img className="imgLogo" src = {logo} alt = "logo"/>
            </div>
                    <div className="navbar">
                    <button className = "buton">
                        HOME
                    </button>
                    <button className = "buton" value="foto"  onClick={() => {this.props.showContent('foto')}}>
                        POZE
                    </button>
                    <button className = "buton" value="locations" onClick={() => {this.props.showContent('locations')}}>
                        LOCURI DE ZBOR
                    </button>
                    <button className = "buton" value="video" onClick={() => {this.props.showContent('video')}} >
                        VIDEO
                    </button>
                    <button className = "buton" value="contact" onClick={() => {this.props.showContent('contact')}}>
                        CONTACT
                    </button>
                    </div>
            </div>
        )
    }
        
}