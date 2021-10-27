import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "../../NewsCarousel.css";
import Card from 'react-bootstrap/Card';
import {Helmet} from "react-helmet";

export default class NewsCarousel extends Component {

    componentDidMount() {
        this.loadImages();
    }
    
      loadImages = () => {
        this.props.items.forEach((item) => {
          const img = new Image();
          img.src = item.fileName;
          console.log("image::", img); 
      });
      }

    render(){
        console.log("thisItemss:news::", this.props.items)
        return (
                <div className="News"> 
                 <Helmet>
                    <title>News - SouthParagliding</title>
                    {this.props.items.map((item, index)=> <meta key= {index} name="title" 
                        content={item.titlu}
                    /> 
                    )}
                    {this.props.items.map((item, index) => <meta key={index} name="description" 
                        content={item.description}
                    /> )}
                    {this.props.items.map((item, index) => <meta key= {index} name = "image" content = {item.fileName} />
                    )}
                    <meta name="keywords"
                        content="informatii noi despre zbor cu parapanta, parapanta, parapantism, Craiova, south paragliding, paragliding, zbor cu parapanta"
                        />
                </Helmet>
                    <div className="newsTitle">
                    {console.log("propsss:news:", this.props)}
                        <span>{this.props.title}</span>
                    </div>
                    {this.props.items.length === 1 ? 
                    <Carousel controls={false} className="newsCarousel" interval={null}>
                    {console.log("propsss::", this.props.items)}
                    {this.props.items.reverse().map((item, index) => {
                            return (
                                <Carousel.Item className="newsItem" key={index}>
                                {item.fileName ? <a href ="https://www.facebook.com/zborcuparapantaranca">
                                    <img onLoad = {this.loadImages}
                                    className="pozaModalNews"
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
                    </Carousel> : 
                    this.props.items.length > 1 ? 
                    <Carousel className="newsCarousel" interval={null}>
                    {console.log("propsss::", this.props.items)}
                    {this.props.items.reverse().map((item, index) => {
                            return (
                                <Carousel.Item className="newsItem" key={index}>
                                {item.fileName ? <a href ="https://www.facebook.com/zborcuparapantaranca">
                                    <img 
                                    onLoad = {this.loadImages}
                                    className="pozaModalNews"
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
                    </Carousel> :
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
