import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../NewsCarousel.css";


export default class NewsCarousel extends Component {
    render(){
        return (
                <div className="News"> 
                    <div className="newsTitle">
                    {console.log("propsss:news:", this.props.title)}
                        <span>{this.props.title}</span>
                    </div>
                    <Carousel className="newsCarousel" interval={null}>
                        {this.props.items.map(item => {
                            return (
                                <Carousel.Item className="newsItem">
                                <a href ="https://www.facebook.com/zborcuparapantaranca">
                                    <img className="pozaModalNews"
                                    src={item.src}
                                    alt="slide"
                                    />
                                </a>
                                    <Carousel.Caption className="newsText">
                                    <span>{item.title}</span>
                                    <p>{item.text}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </div>
        )
    }
}

