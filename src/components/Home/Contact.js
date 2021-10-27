import React from 'react';
import contactLogo from "../../assets/icons/contactIcon.png";
import  FollowUs from "../../assets/SocialMedia/FollowUs.png";
import "../../Contact.css";
import {Helmet} from "react-helmet";

export default class Contact extends React.Component {

    render() {
        console.log("propsContact::", this.props);
        return(
            <div className="contactComponent">
                <Helmet>
                <title>Contact - SouthParagliding</title>
                <meta name="description" content="Contact si rezervari @ South Paragliding " />
                <link rel="stylesheet" href="Contact.css" />
                <link rel="icon" href = {contactLogo} />
                <link rel="external" href ="https://www.facebook.com/zborcuparapantaranca" />
                {this.props.items.map((item, index) => 
                <meta key = {index} name="title" content = {item.titlu}/>
                )}
                {this.props.items.map((item, index) => 
                <meta key = {index} name="description" content = {item.description}/>
                )}
                {this.props.items.map((item, index) => 
                <link key = {index}  rel="author" href = {item.email}/>
                )}
                {this.props.items.map((item, index) => 
                <link key = {index}  rel="author" href = {item.phone}/>
                )}
                </Helmet>
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
                                                <span className = "contactDescription" key="text">{row.description}</span><br /> <br />
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

 