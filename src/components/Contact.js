import React from 'react';
import contactLogo from "../assets/icons/contactIcon.png";


export default class Contact extends React.Component {

    render() {
        return(
            <div className="contactComponent">
                <div className= "contactIconContainer">
                    <img alt="logo" className = "contactIcon" src = {contactLogo}/>
                </div>
                    <div className="contactDetails">
                        {this.props.items.map((item,index) =>{
                            console.log("item;;", item)
                            return (
                                <div>
                                    <div className="contact" >
                                        <span key="title">PROGRAMARE</span> <br /><br /> 
                                        <span key="text">Echipa noastra este gata <br />sa iti preia apelul.</span><br /> <br />
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