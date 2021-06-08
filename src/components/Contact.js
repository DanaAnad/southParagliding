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
                                        <span key="text">Echipa noastra este gata <br />sa intre in contact cu tine.</span><br /> <br />
                                        <a href ={`tel:${item.phone}`}>{item.phone}</a><br />
                                        <a href = {`mailto:${item.email}`}>{item.email}</a><br />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
        )
    }
}