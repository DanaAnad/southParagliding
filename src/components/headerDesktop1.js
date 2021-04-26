import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/Logo/LOGO@2x.png";

export default class Header1 extends React.Component { 
  
    render(){  
        //nu mam jucat deloc la stiluri, am creat doar ca arhitectura acesta componetat deci nu raspund pt stiluri
        return(
            <div className="logoContainer">
                <img className="imgLogo" src = {logo} alt = "logo"/>
                <div className = "navBar">
                    <div className="butoane">
                        <button className = "buton" variant="light" onClick={() => {this.props.showContent('locations')}}>
                            LOCURI DE ZBOR
                        </button>
                        <button className = "buton" variant="light" onClick={() => {this.props.showContent('foto')}} >
                            FOTO
                        </button>

                    </div>
                </div>
            </div>
        )
    }
        
}