import React from 'react';
import contactLogo from "../../assets/icons/contactIcon.png";
import  FollowUs from "../../assets/SocialMedia/FollowUs.png";
import "../../Contact.css"

export default class Contact extends React.Component {

    render() {
        console.log("propsContact::", this.props);
        return(
            <div className="contactComponent">
                    <div key = "iconContainer" className= "contactIconContainer">
                        <img alt="logo" className = "contactIcon" src = {contactLogo}/>
                    </div>
                        <div key = "contactContainer" className="contactDetails">
                            {this.props.items.map((row, index, {length}) =>  {
                                if(index +1 === length){
                                    console.log("row::", row)
                                    return (
                                        <div className="" key = {index}>
                                            <div className="contactText" >
                                                <span key="title">{row.titlu}</span> <br /><br />
                                                <span key="text">{row.description}</span><br /> <br />
                                            </div>
                                            <div className="contact" >
                                                <a href ={`tel:${row.phone}`}>{row.phone}</a><br />
                                                <a href = {`mailto:${row.email}`}>{row.email}</a><br /><br />
                                            </div>
                                            <div className="socialMediaContact" >
                                            <a href="https://www.facebook.com/zborcuparapantaranca"><img src ={FollowUs} alt="fb"/></a>
                                            </div>
                                        </div>
                                    )
                                }  else return null;                   
                            })} 
                        </div>
                </div>
        )
    }
}

 