import React from 'react';
import contactLogo from "../assets/icons/contactIcon.png";
import  FollowUs from "../assets/SocialMedia/FollowUs.png";
import "../Contact.css"


export default class Contact extends React.Component {

    render() {
        return(
            <div className="contactComponent">
                <div key = "iconContainer" className= "contactIconContainer">
                    <img alt="logo" className = "contactIcon" src = {contactLogo}/>
                </div>
                    <div key = "contactContainer" className="contactDetails">
                        {this.props.items.map((item,index) =>{
                            return (
                                <div className="" >
                                    <div className="contactText" key = {index}>
                                        <span key="title">{item.titlu}</span> <br /><br />
                                        <span key="text">{item.description}</span><br /> <br />
                                    </div>
                                    <div className="contact" key = {index}>
                                        <a href ={`tel:${item.phone}`}>{item.phone}</a><br />
                                        <a href = {`mailto:${item.email}`}>{item.email}</a><br /><br />
                                    </div>
                                    <div className="socialMediaContact" key = {index}>
                                    <a href="https://www.facebook.com/zborcuparapantaranca"><img src ={FollowUs} alt="fb"/></a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
        )
    }
}