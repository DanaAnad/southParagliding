import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import "../../carousel.css";

export default class VideoCarousel extends Component {

  render(){
    console.log("propsVideo::", this.props);
    return(
      <div>
      <Carousel className="videoCarousel" interval={null} >
          {this.props.items.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <video className="videoItem" controls="controls">
                        <source src={item.fileName} type="video/mp4"/>
                  </video>
                </Carousel.Item>
              );
          })}
      </Carousel>
      </div>
    )
  }
}

