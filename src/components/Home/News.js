import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../NewsCarousel.css";
import Card from 'react-bootstrap/Card';
import {Helmet} from "react-helmet";

export default class NewsCarousel extends Component {

    componentDidMount() {
        this.props.items.forEach((item) => {
            const img = new Image();
            img.src = item.data.data.fileName;
        });
    }

    render(){
        return (
                <div className="News"> 
                 <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <title>News - SouthParagliding</title>
                    {this.props.items.map((item, index)=> <meta key= {index} name="title" 
                        content={item.data.data.titlu}
                    /> 
                    )}
                    {this.props.items.map((item, index) => <meta key={index} name="description" 
                        content={item.data.data.description}
                    /> )}
                    {this.props.items.map((item, index) => <meta key= {index} name = "image" content = {item.data.data.fileName} />
                    )}
                    <meta name="keywords"
                        content="informatii noi despre zbor cu parapanta, parapanta, parapantism, Craiova, south paragliding, paragliding, zbor cu parapanta, parapanta Craiova, south paragliding Craiova, zbor cu parapanta Craiova
                        program zbor, program south paragliding Craiova"
                        />
                </Helmet>
                    <div className="newsTitle">
                        <span>{this.props.title}</span>
                    </div>
                    {this.props.items.length === 1 ? 
                    <Carousel controls={false} className="newsCarousel" interval={null}>
                    {this.props.items.reverse().map((item, index) => {
                            return (
                                <Carousel.Item className="newsItem" key={index}>
                                {item.data.data.fileName ? <a href ="https://www.facebook.com/zborcuparapantaranca">
                                    <img 
                                    className="pozaModalNews"
                                    src={item.data.data.fileName}
                                    alt="slide"
                                    /> 
                                </a>  : null}
                                    <Carousel.Caption className="newsText">
                                    <span>{item.data.data.titlu}</span>
                                    <p>{item.data.data.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                    })
                    }
                    </Carousel> : 
                    this.props.items.length > 1 ? 
                    <Carousel className="newsCarousel" interval={null}>
                    {this.props.items.reverse().map((item, index) => {
                            return (
                                <Carousel.Item className="newsItem" key={index}>
                                {item.data.data.fileName ? 
                                    <img 
                                    className="pozaModalNews"
                                    src={item.data.data.fileName}
                                    alt="slide"
                                    /> 
                                  : null}
                                    <Carousel.Caption className="newsText">
                                    <span>{item.data.data.titlu}</span>
                                    <p>{item.data.data.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                    })
                    }
                    </Carousel> :
                    <Card
                        bg={"#fff"}
                        text={ 'dark'}
                        className="mb-2 bodyCard"
                    >
                        <Card.Body>
                        <Card.Text>
                        <span> Nothing here. <br />
                        Out team will soon upload some data for the users.</span>
                        </Card.Text>
                        </Card.Body>
                    </Card> 
                    }                   
                </div>
        )
    }
}

