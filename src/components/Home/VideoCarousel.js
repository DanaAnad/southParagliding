import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card'
import "../../CSS_files/carousel.css";
import {Helmet} from "react-helmet";

export default class VideoCarousel extends Component {

  componentDidMount() {
    this.props.items.forEach((item) => {
      const img = new Image();
      img.src = item.data.data.fileName;
  });
}

  render(){
    return(
      <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Videos - SouthParagliding</title>
        <meta name="description" content="Poze si filme de la zbor cu echipa South Paraglidig Craiova" />
        {this.props.items.map((item, index)=>
          <meta key = {index} name = "video" content={item.data.data.fileName} />
              )} 
      </Helmet>
      {this.props.items.length === 1 ? 
      <Carousel controls={false} className="videoCarousel" interval={null} >
        {this.props.items.reverse().map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <video className="videoItem" controls="controls">
                    {item.data.data.fileName && <source className="img-fluid" src={item.data.data.fileName} type="video/mp4"/> }
                </video>
              </Carousel.Item>
            )
          })
        } 
      </Carousel> :
      this.props.items.length > 1 ?
      <Carousel className="videoCarousel" interval={null} >
        {this.props.items.reverse().map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <video className="videoItem" controls="controls">
                    {item.data.data.fileName && <source className="img-fluid" src={item.data.data.fileName} type="video/mp4"/> }
                </video>
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
            <span> For the moment there is nothing here. <br />
              Our team will be soon uploading some data.</span>
            </Card.Text>
            </Card.Body>
        </Card> 
      } 
      </div>
    )
  }
}

