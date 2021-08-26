import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../NewsCarousel.css";

export default class NewsCarousel extends Component {
    render(){
        return (
                <div className="News"> 
                    <div className="newsTitle">
                    {console.log("propsss:news:", this.props)}
                        <span>{this.props.title}</span>
                    </div>
                    <Carousel className="newsCarousel" interval={null}>
                        {this.props.items.map((item, index)=> {
                            return (
                                <Carousel.Item className="newsItem" key={index}>
                                <a href ="https://www.facebook.com/zborcuparapantaranca">
                                    <img className="pozaModalNews"
                                    src={item.fileName}
                                    alt="slide"
                                    />
                                </a>
                                    <Carousel.Caption className="newsText">
                                    <span>{item.titlu}</span>
                                    <p>{item.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </div>
        )
    }
}

