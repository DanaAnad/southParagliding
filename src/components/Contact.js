import React from 'react';
import contactLogo from "../assets/icons/contactIcon.png";
import "../Contact.css"


export default class Contact extends React.Component {

    render() {
        return(
            <div className="contactComponent">
                <div className= "contactIconContainer">
                    <img alt="logo" className = "contactIcon" src = {contactLogo}/>
                </div>
                    <div className="contactDetails">
                        {this.props.items.map((item,index) =>{
                            return (
                                <div>
                                    <div className="contact" >
                                        <span key="title">PROGRAMARE</span> <br /><br /> 
                                        <span key="text">Echipa noastra este gata <br />sa-ti preia apelul.</span><br /> <br />
                                        <span key ="phone"><b>{item.phone}</b></span><br />
                                        <span key = "email"> {item.email}</span><br />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
        )
    }
}