import React from 'react';
import "../../CSS_files/Contact.css";
import contactLogo from "../../assets/icons/contactIcon.png";
import  FollowUs from "../../assets/SocialMedia/FollowUs.png";
import {Helmet} from "react-helmet";

export default class Contact extends React.Component {
    componentDidMount() {
        const img= new Image();
        img.src = FollowUs;
    };
    render() {
        return(
            <div className="contactComponent">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <title>Contact - SouthParagliding | Parapanta Rânca</title>
                    <meta name="description" content="Contact si rezervari @ South Paragliding " />
                    <link rel="stylesheet" href="Contact.css" />
                    {/* <link rel="icon" href = {contactLogo} /> */}
                    <link rel="external" href ="https://www.facebook.com/zborcuparapantaranca" />
                    <meta name="title" content = {this.props.items[this.props.items.length-1].titlu}/>
                    <link rel="author" href = {this.props.items[this.props.items.length-1].email}/>
                    <link rel="author" href = {this.props.items[this.props.items.length-1].phone}/>
                </Helmet>
                    <div key = "iconContainer" className= "contactIconContainer">
                        <img alt="logo" className = "contactIcon" src = {contactLogo}/>
                    </div>
                        <div key = "contactContainer" className="contactDetails">
                            {this.props.items.map((row, index, {length}) =>  {
                                if(index +1 === length){
                                    return (
                                        <div className="" key = {index}>
                                            <div className="contactText" >
                                                <span key="title">{row.data.data.titlu}</span> <br /><br />
                                                <span className = "contactDescription" key="text">{row.data.data.description}</span><br /> <br />
                                            </div>
                                            <div className="contact" >
                                                <a href ={`tel:${row.data.data.phone}`}>{row.data.data.phone}</a><br />
                                                <a href = {`mailto:${row.data.data.email}`}>{row.data.data.email}</a><br /><br />
                                            </div>
                                            <div className="socialMediaContact" >
                                            <a href="https://www.facebook.com/zborcuparapantaranca"><img src ={FollowUs} alt="fbFollowUs"/></a>
                                            </div>
                                        </div>
                                    )
                                }  else return null;                   
                            })} 
                        </div>
                </div>
        )
    };
};

 