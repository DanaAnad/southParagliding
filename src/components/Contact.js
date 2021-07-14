import React from 'react';
import contactLogo from "../assets/icons/contactIcon.png";
import  FollowUs from "../assets/SocialMedia/FollowUs.png";
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
                                <div className="">
                                    <div className="contactText" >
                                        <span key="title">{item.title}</span> <br /><br />
                                        <span key="text">{item.text}</span><br /> <br />
                                    </div>
                                    <div className="contact">
                                        <a href ={`tel:${item.phone}`}>{item.phone}</a><br />
                                        <a href = {`mailto:${item.email}`}>{item.email}</a><br /><br />
                                    </div>
                                    <div className="socialMediaContact">
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