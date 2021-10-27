import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card'
import "../../carousel.css";
import {Helmet} from "react-helmet";

export default class VideoCarousel extends Component {

  componentDidMount() {
    this.loadVideos();
}

  loadVideos = () => {
    this.props.items.forEach((item) => {
      const img = new Image();
      img.src = item.fileName;
      console.log("image::", img); 
  });
  }

  render(){
    console.log("propsVideo::", this.props);
    return(
      <div>
      <Helmet>
      <title>Videos - SouthParagliding</title>
      <meta name="description" content="Poze si filme de la zbor cu echipa South Paraglidig" />
      {this.props.items.map((item, index)=>
          <meta key = {index} name = "video" content={item.fileName} />
              )} 
      </Helmet>
      {this.props.items.length === 1 ? 
      <Carousel controls={false} className="videoCarousel" interval={null} >
        {this.props.items.reverse().map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <video className="videoItem" controls="controls">
                    {item.fileName && <source onLoad = {this.loadVideos} className="img-fluid" src={item.fileName} type="video/mp4"/> }
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
                    {item.fileName && <source onLoad = {this.loadVideos} className="img-fluid" src={item.fileName} type="video/mp4"/> }
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

