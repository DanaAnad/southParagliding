import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../NewsCarousel.css";
import Card from 'react-bootstrap/Card'

export default class NewsCarousel extends Component {
    render(){
        console.log("thisItemss:news::", this.props.items)
        return (
                <div className="News"> 
                    <div className="newsTitle">
                    {console.log("propsss:news:", this.props)}
                        <span>{this.props.title}</span>
                    </div>
                    {this.props.items.length > 0 ?
                    <Carousel className="newsCarousel" interval={null}>
                    {console.log("propsss::", this.props.items)}
                    {this.props.items.reverse().map((item, index) => {
                            return (
                                <Carousel.Item className="newsItem" key={index}>
                                {item.fileName ? <a href ="https://www.facebook.com/zborcuparapantaranca">
                                    <img className="pozaModalNews"
                                    src={item.fileName}
                                    alt="slide"
                                    /> 
                                </a>  : null}
                                    <Carousel.Caption className="newsText">
                                    <span>{item.titlu}</span>
                                    <p>{item.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                    })
                    }
                    </Carousel>  : 
                    <Card
                        bg={"#fff"}
                        text={ 'dark'}
                        className="mb-2 bodyCard"
                    >
                        <Card.Body>
                        <Card.Text>
                           <span> No news here. <br />
                            Admin please upload some data for the users.</span>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    }
                </div>
        )
    }
}

